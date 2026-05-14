import { MessageCircle, ShieldCheck } from "lucide-react";

const VendorAuthHeader = ({ status = "phone" }) => {
  const isVerified = status === "verified";

  return (
    <div className="mb-6 sm:mb-8">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-sm font-medium text-emerald-100">
        {isVerified ? (
          <ShieldCheck className="h-4 w-4" />
        ) : (
          <MessageCircle className="h-4 w-4" />
        )}
        WhatsApp verification
      </div>

      <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
        {isVerified ? "WhatsApp Verified" : "Verify Your WhatsApp Number"}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
        {isVerified
          ? "You are ready to create a listing students can trust."
          : "We'll use WhatsApp to send student inquiries directly to you."}
      </p>
    </div>
  );
};

export default VendorAuthHeader;
