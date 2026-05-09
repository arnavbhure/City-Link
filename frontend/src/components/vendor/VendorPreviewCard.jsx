import { MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const MotionArticle = motion.article;

const getDetailTags = (categoryId, details) => {
  const detailMap = {
    tiffin: [details.mealType, details.pricing],
    laundry: [details.pickupDrop, details.turnaroundTime],
    pg: [details.occupancy, details.rentRange],
    movers: [details.vehicleType, details.startingPrice],
    wifi: [details.planSpeed, details.monthlyPrice],
    bike: [details.vehicleOptions, details.pricingModel],
  };

  return (detailMap[categoryId] || []).filter(Boolean).slice(0, 2);
};

const getWhatsAppUrl = (phoneNumber) => {
  const digits = phoneNumber.replace(/\D/g, "");

  if (!digits) {
    return "#";
  }

  if (phoneNumber.trim().startsWith("+")) {
    return `https://wa.me/${digits}`;
  }

  return `https://wa.me/${digits.length === 10 ? `91${digits}` : digits}`;
};

const VendorPreviewCard = ({ businessInfo, category, categoryDetails, photos }) => {
  const Icon = category?.icon;
  const imageUrl = photos[0]?.url;
  const tags = [
    category?.shortName || "Service",
    ...getDetailTags(category?.id, categoryDetails),
  ];
  const location = [businessInfo.area, businessInfo.city].filter(Boolean).join(", ");
  const whatsappUrl = getWhatsAppUrl(businessInfo.whatsapp);

  return (
    <MotionArticle
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="max-w-xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/85 shadow-2xl shadow-black/30"
    >
      <div className="relative h-56 bg-slate-950">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={businessInfo.businessName || "Business listing"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className={`flex h-full items-center justify-center bg-gradient-to-br ${category?.accent || "from-indigo-400/15 to-cyan-300/10"}`}
          >
            {Icon ? <Icon className="h-12 w-12 text-white/80" /> : null}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/85 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-sm text-white backdrop-blur">
          <ShieldCheck className="h-4 w-4 text-cyan-200" />
          CityLink reviewed
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              {businessInfo.businessName || "Your Business Name"}
            </h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="h-4 w-4 text-indigo-200" />
              {location || "Area, City"}
            </p>
          </div>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-indigo-100">
            {Icon ? <Icon className="h-5 w-5" /> : null}
          </div>
        </div>

        <p className="mt-5 leading-7 text-slate-300">
          {businessInfo.description ||
            "A short, friendly description of what students can expect from this service."}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Owner: {businessInfo.ownerName || "Name"}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </MotionArticle>
  );
};

export default VendorPreviewCard;
