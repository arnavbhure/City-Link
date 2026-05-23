import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  LoaderCircle,
  RotateCcw,
  Send,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-hot-toast";
import createVendorListing from "../../api/vendor/createVendorListing";
import VendorAuthCard from "../../components/vendor/auth/VendorAuthCard";
import VendorAuthHeader from "../../components/vendor/auth/VendorAuthHeader";
import VendorOtpInput from "../../components/vendor/auth/VendorOtpInput";
import VendorPhoneInput from "../../components/vendor/auth/VendorPhoneInput";
import VendorCategoryCard from "../../components/vendor/VendorCategoryCard";
import VendorFormInput from "../../components/vendor/VendorFormInput";
import VendorNavbarBanner from "../../components/vendor/VendorNavbarBanner";
import VendorPhotoUpload from "../../components/vendor/VendorPhotoUpload";
import VendorPreviewCard from "../../components/vendor/VendorPreviewCard";
import VendorStepIndicator from "../../components/vendor/VendorStepIndicator";
import VendorSuccessScreen from "../../components/vendor/VendorSuccessScreen";
import VendorTextarea from "../../components/vendor/VendorTextarea";
import {
  getCategoryDefaultDetails,
  initialBusinessInfo,
  vendorCategories,
  vendorSteps,
} from "../../components/vendor/vendorOnboardingData";
import BikeRentalForm from "../../components/vendor/categoryForms/BikeRentalForm";
import LaundryForm from "../../components/vendor/categoryForms/LaundryForm";
import MoversForm from "../../components/vendor/categoryForms/MoversForm";
import PGForm from "../../components/vendor/categoryForms/PGForm";
import TiffinForm from "../../components/vendor/categoryForms/TiffinForm";
import WifiForm from "../../components/vendor/categoryForms/WifiForm";
import { auth } from "../../services/firebase";

const categoryForms = {
  tiffin: TiffinForm,
  laundry: LaundryForm,
  pg_hostel: PGForm,
  movers: MoversForm,
  wifi: WifiForm,
  bike_rental: BikeRentalForm,
};

const MotionDiv = motion.div;
const recaptchaContainerId = "vendor-recaptcha";

const formatVerifiedPhone = (countryCode, phoneNumber) =>
  `${countryCode} ${phoneNumber}`.trim();

const stepVariants = {
  enter: {
    opacity: 0,
    y: 14,
    filter: "blur(4px)",
  },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(4px)",
  },
};

const StepHeader = ({ eyebrow, title, description }) => (
  <div className="mb-8 max-w-2xl">
    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-300">
      {eyebrow}
    </p>
    <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
      {title}
    </h1>
    <p className="mt-4 leading-8 text-slate-400">{description}</p>
  </div>
);

const StepActions = ({
  currentStep,
  onBack,
  onNext,
  nextLabel,
  nextIcon = <ArrowRight className="h-4 w-4" />,
  disabled = false,
}) => (
  <div className="mt-9 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
    <button
      type="button"
      onClick={onBack}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10 ${
        currentStep === 1 ? "invisible" : ""
      }`}
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>

    <button
      type="button"
      onClick={onNext}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-slate-600"
    >
      {nextLabel}
      {nextIcon}
    </button>
  </div>
);

const VendorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [vendorAuth, setVendorAuth] = useState({
    countryCode: "+91",
    phoneNumber: "",
    otp: "",
    phase: "phone",
    isSending: false,
    isVerifying: false,
    resendSeconds: 0,
    verifiedPhone: "",
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState("tiffin");
  const [businessInfo, setBusinessInfo] = useState(initialBusinessInfo);
  const [categoryDetails, setCategoryDetails] = useState(
    getCategoryDefaultDetails("tiffin"),
  );
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const photosRef = useRef(photos);
  const recaptchaRef = useRef(null);
  const confirmationRef = useRef(null);

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  useEffect(() => {
    return () => {
      photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, []);

  useEffect(() => {
    if (vendorAuth.phase !== "otp" || vendorAuth.resendSeconds <= 0) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setVendorAuth((current) => ({
        ...current,
        resendSeconds: Math.max(0, current.resendSeconds - 1),
      }));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [vendorAuth.phase, vendorAuth.resendSeconds]);

  const selectedCategory = useMemo(
    () =>
      vendorCategories.find((category) => category.id === selectedCategoryId) ||
      vendorCategories[0],
    [selectedCategoryId],
  );

  const CategoryForm = categoryForms[selectedCategoryId];

  useEffect(() => {
    setCategoryDetails(getCategoryDefaultDetails(selectedCategoryId));
  }, [selectedCategoryId]);

  useEffect(() => {
    return () => {
      if (recaptchaRef.current?.clear) {
        recaptchaRef.current.clear();
      }
    };
  }, []);

  const handleBusinessChange = (event) => {
    const { name, value } = event.target;
    setBusinessInfo((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCategoryFieldChange = (name, value) => {
    setCategoryDetails((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCountryCodeChange = (countryCode) => {
    setVendorAuth((current) => ({
      ...current,
      countryCode,
    }));
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    setVendorAuth((current) => ({
      ...current,
      phoneNumber: phoneNumber.replace(/\D/g, "").slice(0, 15),
    }));
  };

  const handleOtpChange = (otp) => {
    setVendorAuth((current) => ({
      ...current,
      otp,
    }));
  };

  const initRecaptcha = () => {
    if (recaptchaRef.current) {
      return recaptchaRef.current;
    }

    recaptchaRef.current = new RecaptchaVerifier(auth, recaptchaContainerId, {
      size: "invisible",
    });

    recaptchaRef.current.render();
    return recaptchaRef.current;
  };

  const sendOtp = async () => {
    if (vendorAuth.phoneNumber.length < 8 || vendorAuth.isSending) {
      return;
    }

    setVendorAuth((current) => ({
      ...current,
      isSending: true,
    }));

    try {
      const appVerifier = initRecaptcha();
      const fullNumber = `${vendorAuth.countryCode}${vendorAuth.phoneNumber}`;
      confirmationRef.current = await signInWithPhoneNumber(
        auth,
        fullNumber,
        appVerifier,
      );

      setVendorAuth((current) => ({
        ...current,
        otp: "",
        phase: "otp",
        isSending: false,
        resendSeconds: 30,
      }));
      toast.success("OTP sent successfully");
    } catch (error) {
      console.error("OTP send failed:", error);
      setVendorAuth((current) => ({
        ...current,
        isSending: false,
      }));
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const resendOtp = async () => {
    if (vendorAuth.resendSeconds > 0 || vendorAuth.isSending) {
      return;
    }

    setVendorAuth((current) => ({
      ...current,
      isSending: true,
    }));

    try {
      const appVerifier = initRecaptcha();
      const fullNumber = `${vendorAuth.countryCode}${vendorAuth.phoneNumber}`;
      confirmationRef.current = await signInWithPhoneNumber(
        auth,
        fullNumber,
        appVerifier,
      );

      setVendorAuth((current) => ({
        ...current,
        otp: "",
        isSending: false,
        resendSeconds: 30,
      }));
      toast.success("OTP resent");
    } catch (error) {
      console.error("OTP resend failed:", error);
      setVendorAuth((current) => ({
        ...current,
        isSending: false,
      }));
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    if (vendorAuth.otp.length !== 6 || vendorAuth.isVerifying) {
      return;
    }

    if (!confirmationRef.current) {
      toast.error("Please request an OTP first");
      return;
    }

    setVendorAuth((current) => ({
      ...current,
      isVerifying: true,
    }));

    try {
      await confirmationRef.current.confirm(vendorAuth.otp);

      const verifiedPhone = formatVerifiedPhone(
        vendorAuth.countryCode,
        vendorAuth.phoneNumber,
      );

      setVendorAuth((current) => ({
        ...current,
        phase: "verified",
        isVerifying: false,
        verifiedPhone,
      }));

      setBusinessInfo((current) => ({
        ...current,
        phone: current.phone || verifiedPhone,
        whatsapp: verifiedPhone,
      }));

      toast.success("Phone verified");
      window.setTimeout(() => {
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 700);
    } catch (error) {
      console.error("OTP verification failed:", error);
      setVendorAuth((current) => ({
        ...current,
        isVerifying: false,
      }));
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const changeVerifiedNumber = () => {
    confirmationRef.current = null;
    setVendorAuth((current) => ({
      ...current,
      phase: "phone",
      otp: "",
      verifiedPhone: "",
      resendSeconds: 0,
    }));
  };

  const handleAddPhotos = (files) => {
    if (!files.length) {
      return;
    }

    const remainingSlots = Math.max(0, 6 - photos.length);
    const nextPhotos = files.slice(0, remainingSlots).map((file, index) => ({
      id: `${file.name}-${file.lastModified}-${Date.now()}-${index}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setPhotos((current) => [...current, ...nextPhotos]);
  };

  const handleRemovePhoto = (photoId) => {
    setPhotos((current) => {
      const photoToRemove = current.find((photo) => photo.id === photoId);
      if (photoToRemove) {
        URL.revokeObjectURL(photoToRemove.url);
      }

      return current.filter((photo) => photo.id !== photoId);
    });
  };

  const isBusinessStepReady =
    businessInfo.businessName.trim() &&
    businessInfo.ownerName.trim() &&
    businessInfo.phone.trim() &&
    businessInfo.city.trim() &&
    businessInfo.area.trim();

  const isNextDisabled =
    (currentStep === 3 && !selectedCategoryId) ||
    (currentStep === 4 && !isBusinessStepReady);

  const goNext = () => {
    setCurrentStep((step) => Math.min(step + 1, vendorSteps.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitListing = async () => {
    if (isSubmitting) {
      return;
    }

    const verifiedPhone =
      vendorAuth.verifiedPhone || businessInfo.whatsapp || businessInfo.phone;

    const payload = {
      category: selectedCategoryId,
      business_name: businessInfo.businessName,
      owner_name: businessInfo.ownerName,
      phone: businessInfo.phone,
      whatsapp: businessInfo.whatsapp || verifiedPhone,
      city: businessInfo.city,
      area: businessInfo.area,
      description: businessInfo.description,
      verified_phone: verifiedPhone,
      category_details: categoryDetails,
      photos: photos
        .map((photo) => photo.file?.name || photo.name)
        .filter(Boolean),
    };

    setIsSubmitting(true);
    const response = await createVendorListing(payload);

    if (!response?.success) {
      const message =
        response?.errors?.[0]?.msg ||
        response?.message ||
        "Failed to submit listing";
      toast.error(message);
      setIsSubmitting(false);
      return;
    }

    toast.success("Listing submitted");
    setIsSubmitting(false);
    setCurrentStep(8);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shareUrl = `https://wa.me/?text=${encodeURIComponent(
    `I listed ${businessInfo.businessName || "my service"} on CityLink. Students can now reach me for ${selectedCategory.name}.`,
  )}`;

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-indigo-200 backdrop-blur">
              For local student-friendly businesses
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Grow Your Business with CityLink
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Reach nearby students looking for trusted local services.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Start Listing
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <VendorNavbarBanner />
        </div>
      );
    }

    if (currentStep === 2) {
      const isPhoneReady = vendorAuth.phoneNumber.length >= 8;
      const isOtpReady = vendorAuth.otp.length === 6;
      const verifiedPhone =
        vendorAuth.verifiedPhone ||
        formatVerifiedPhone(vendorAuth.countryCode, vendorAuth.phoneNumber);

      return (
        <>
          <VendorAuthHeader
            status={vendorAuth.phase === "verified" ? "verified" : "phone"}
          />
          <VendorAuthCard
            isVerified={vendorAuth.phase === "verified"}
            footer={
              <div className="flex min-w-0 flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                {vendorAuth.phase === "otp" ? (
                  <button
                    type="button"
                    onClick={changeVerifiedNumber}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Change number
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                )}

                {vendorAuth.phase === "phone" ? (
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={!isPhoneReady || vendorAuth.isSending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-slate-600 sm:w-auto"
                  >
                    {vendorAuth.isSending ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : null}
                    Continue
                    {!vendorAuth.isSending ? (
                      <ArrowRight className="h-4 w-4" />
                    ) : null}
                  </button>
                ) : null}

                {vendorAuth.phase === "otp" ? (
                  <button
                    type="button"
                    onClick={verifyOtp}
                    disabled={!isOtpReady || vendorAuth.isVerifying}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-slate-600 sm:w-auto"
                  >
                    {vendorAuth.isVerifying ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : null}
                    Verify OTP
                    {!vendorAuth.isVerifying ? (
                      <ArrowRight className="h-4 w-4" />
                    ) : null}
                  </button>
                ) : null}

                {vendorAuth.phase === "verified" ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 sm:w-auto"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
            }
          >
            <AnimatePresence mode="wait">
              {vendorAuth.phase === "phone" ? (
                <MotionDiv
                  key="phone"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <VendorPhoneInput
                    countryCode={vendorAuth.countryCode}
                    phoneNumber={vendorAuth.phoneNumber}
                    onCountryCodeChange={handleCountryCodeChange}
                    onPhoneNumberChange={handlePhoneNumberChange}
                    disabled={vendorAuth.isSending}
                  />
                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    No password, email, or account setup. Just verify the number
                    students will message.
                  </p>
                </MotionDiv>
              ) : null}

              {vendorAuth.phase === "otp" ? (
                <MotionDiv
                  key="otp"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-emerald-300/15 bg-emerald-400/10 p-4">
                    <p className="text-sm text-emerald-50/90">
                      Code sent to{" "}
                      <span className="font-semibold text-white">
                        {verifiedPhone}
                      </span>
                    </p>
                  </div>

                  <VendorOtpInput
                    value={vendorAuth.otp}
                    onChange={handleOtpChange}
                    disabled={vendorAuth.isVerifying}
                  />

                  <div className="flex min-w-0 flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>Enter the 6-digit code sent to your phone.</span>
                    <button
                      type="button"
                      onClick={resendOtp}
                      disabled={
                        vendorAuth.resendSeconds > 0 || vendorAuth.isSending
                      }
                      className="inline-flex items-center gap-2 font-semibold text-emerald-100 transition hover:text-white disabled:cursor-not-allowed disabled:text-slate-600"
                    >
                      <RotateCcw className="h-4 w-4" />
                      {vendorAuth.resendSeconds > 0
                        ? `Resend in ${vendorAuth.resendSeconds}s`
                        : "Resend code"}
                    </button>
                  </div>
                </MotionDiv>
              ) : null}

              {vendorAuth.phase === "verified" ? (
                <MotionDiv
                  key="verified"
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="rounded-[1.5rem] border border-emerald-300/20 bg-emerald-400/10 p-6"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-100">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {vendorAuth.verifiedPhone} is verified.
                  </p>
                  <p className="mt-2 leading-7 text-slate-400">
                    We'll prefill this as your WhatsApp contact in the listing
                    form.
                  </p>
                </MotionDiv>
              ) : null}
            </AnimatePresence>
          </VendorAuthCard>
          <div
            id={recaptchaContainerId}
            className="absolute -left-2499.75 top-0"
          />
        </>
      );
    }

    if (currentStep === 3) {
      return (
        <>
          <StepHeader
            eyebrow="Choose your category"
            title="What do students come to you for?"
            description="Pick the closest match now. You can add more service types later as CityLink grows."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vendorCategories.map((category) => (
              <VendorCategoryCard
                key={category.id}
                category={category}
                selected={selectedCategoryId === category.id}
                onSelect={() => setSelectedCategoryId(category.id)}
              />
            ))}
          </div>
          <StepActions
            currentStep={currentStep}
            onBack={goBack}
            onNext={goNext}
            nextLabel="Continue"
            disabled={isNextDisabled}
          />
        </>
      );
    }

    if (currentStep === 4) {
      return (
        <>
          <StepHeader
            eyebrow="Business information"
            title="Add the details students need first."
            description=""
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <VendorFormInput
              label="Business Name"
              name="businessName"
              value={businessInfo.businessName}
              onChange={handleBusinessChange}
              placeholder="Sharma Tiffin House"
              required
            />
            <VendorFormInput
              label="Owner Name"
              name="ownerName"
              value={businessInfo.ownerName}
              onChange={handleBusinessChange}
              placeholder="Amit Sharma"
              autoComplete="name"
              required
            />
            <VendorFormInput
              label="Phone Number"
              name="phone"
              type="tel"
              value={businessInfo.phone}
              onChange={handleBusinessChange}
              placeholder="9876543210"
              autoComplete="tel"
              required
            />
            <VendorFormInput
              label="WhatsApp Number"
              hint={vendorAuth.verifiedPhone ? "Verified" : "Can be same"}
              name="whatsapp"
              type="tel"
              value={businessInfo.whatsapp}
              onChange={handleBusinessChange}
              placeholder={vendorAuth.verifiedPhone || "9876543210"}
              autoComplete="tel"
              readOnly={Boolean(vendorAuth.verifiedPhone)}
            />
            <VendorFormInput
              label="City"
              name="city"
              value={businessInfo.city}
              onChange={handleBusinessChange}
              placeholder="Pune"
              required
            />
            <VendorFormInput
              label="Area/Locality"
              name="area"
              value={businessInfo.area}
              onChange={handleBusinessChange}
              placeholder="Hinjewadi Phase 1"
              required
            />
            <div className="sm:col-span-2">
              <VendorTextarea
                label="Short Description"
                name="description"
                value={businessInfo.description}
                onChange={handleBusinessChange}
                placeholder="Tell students what makes your service reliable, affordable, or convenient."
                rows={4}
              />
            </div>
          </div>
          {!isBusinessStepReady ? (
            <p className="mt-4 text-sm text-slate-500">
              Business name, owner name, phone number, city, and locality are
              needed for the preview.
            </p>
          ) : null}
          <StepActions
            currentStep={currentStep}
            onBack={goBack}
            onNext={goNext}
            nextLabel="Add service details"
            disabled={isNextDisabled}
          />
        </>
      );
    }

    if (currentStep === 5) {
      return (
        <>
          <StepHeader
            eyebrow={`${selectedCategory.name} details`}
            title="Only answer what matters for this service."
            description="CityLink keeps the listing focused so vendors do not have to fill a long corporate form."
          />
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <CategoryForm
              values={categoryDetails}
              onFieldChange={handleCategoryFieldChange}
            />
          </div>
          <StepActions
            currentStep={currentStep}
            onBack={goBack}
            onNext={goNext}
            nextLabel="Add photos"
          />
        </>
      );
    }

    if (currentStep === 6) {
      return (
        <>
          <StepHeader
            eyebrow="Photos"
            title="Show students what they can trust."
            description="A few honest photos are better than polished stock images. Add up to six."
          />
          <VendorPhotoUpload
            photos={photos}
            onAddPhotos={handleAddPhotos}
            onRemovePhoto={handleRemovePhoto}
          />
          <StepActions
            currentStep={currentStep}
            onBack={goBack}
            onNext={goNext}
            nextLabel="Preview listing"
            nextIcon={<Eye className="h-4 w-4" />}
          />
        </>
      );
    }

    if (currentStep === 7) {
      return (
        <>
          <StepHeader
            eyebrow="Listing preview"
            title="Review how your service will appear."
            description="Confirm the details before publishing your live listing."
          />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-300">
                Quick check
              </p>
              <div className="mt-5 space-y-4 text-sm text-slate-400">
                <p>
                  <span className="text-slate-200">Category:</span>{" "}
                  {selectedCategory.name}
                </p>
                <p>
                  <span className="text-slate-200">Location:</span>{" "}
                  {[businessInfo.area, businessInfo.city]
                    .filter(Boolean)
                    .join(", ") || "Not added"}
                </p>
                <p>
                  <span className="text-slate-200">Photos:</span>{" "}
                  {photos.length
                    ? `${photos.length} uploaded`
                    : "No photos yet"}
                </p>
              </div>
            </div>
            <VendorPreviewCard
              businessInfo={businessInfo}
              category={selectedCategory}
              categoryDetails={categoryDetails}
              photos={photos}
            />
          </div>
          <StepActions
            currentStep={currentStep}
            onBack={goBack}
            onNext={submitListing}
            nextLabel={isSubmitting ? "Publishing..." : "Publish listing"}
            nextIcon={
              isSubmitting ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )
            }
            disabled={isSubmitting}
          />
        </>
      );
    }

    return (
      <VendorSuccessScreen
        onViewListing={() => setCurrentStep(7)}
        shareUrl={shareUrl}
      />
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-x-0 top-0 h-96 bg-[linear-gradient(135deg,rgba(79,70,229,0.18),rgba(14,165,233,0.08),transparent_70%)]" />
      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
        <div className="mb-8">
          <VendorStepIndicator currentStep={currentStep} steps={vendorSteps} />
        </div>

        <AnimatePresence mode="wait">
          <MotionDiv
            key={currentStep}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="rounded-[2rem] border border-white/10 bg-slate-900/55 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 lg:p-10"
          >
            {renderStep()}
          </MotionDiv>
        </AnimatePresence>
      </section>
    </div>
  );
};

export default VendorOnboarding;
