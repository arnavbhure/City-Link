import { createElement, useState } from "react";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  House,
  MapPin,
  MessagesSquare,
  Wallet,
  Wifi,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  propertyTypeOptions,
  initialForm,
  inputClassName,
  amenityOptions,
} from "./constants/postListingConstants";
import formatCurrency from "./utils/formatCurrency";
import HeroPostListing from "./heroPostListing";
import BasicDetails from "./BasicDetails";
import { useHandleFunctions } from "./hooks/handleFunctions";
import PricingAndTiming from "./PricingAndTiming";
import AmenitiesAndFit from "./AmenitiesAndFit";
import Description from "./Description";
import SubmitButton from "./SubmitButton";
import Preview from "./Preview";

const PostListing = () => {
  const {
    formData,
    setFormData,
    handleSubmit,
    handleChange,
    submitState,
    isSubmitting,
    submitMessage,
    setSubmitState,
  } = useHandleFunctions();

  const completionItems = [
    Boolean(formData.title && formData.city && formData.locality),
    Boolean(formData.rent && formData.deposit),
    Boolean(formData.availableFrom && formData.sharingType),
    Boolean(formData.description.trim().length > 40),
  ];

  const user = useSelector((state) => state.user);
  const completedCount = completionItems.filter(Boolean).length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-128">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/18 blur-3xl" />
        <div className="absolute left-8 top-28 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-8 top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section className="relative px-4 pb-16 pt-28 sm:px-8 sm:pb-18 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          <HeroPostListing />
          <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <form
              className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-4xl sm:p-8"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                    Listing details
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    Fill in the essentials
                  </h2>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  {completedCount} of {completionItems.length} sections ready
                </div>
              </div>

              <div className="mt-7 space-y-7">
                <BasicDetails handleChange={handleChange} formData={formData} />
                <PricingAndTiming
                  handleChange={handleChange}
                  formData={formData}
                  setSubmitState={setSubmitState}
                />
                <AmenitiesAndFit
                  formData={formData}
                  handleChange={handleChange}
                />

                <Description formData={formData} handleChange={handleChange} />
              </div>
              <SubmitButton
                submitState={submitState}
                isSubmitting={isSubmitting}
                submitMessage={submitMessage}
              />
            </form>

            <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
              <Preview
                formData={formData}
                completedCount={completedCount}
                completionItems={completionItems}
              />

              <section className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                  Before you post
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Final checklist
                </h2>

                <div className="mt-6 space-y-4">
                  {[
                    "Rent and deposit amounts are visible without follow-up questions.",
                    "Availability matches how quickly someone can move in.",
                    "Description clearly states what is furnished or included.",
                    "House rules are written early enough to avoid mismatched expectations.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-[1.2rem] border border-white/10 bg-slate-950/55 px-4 py-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <p className="text-sm leading-6 text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default PostListing;
