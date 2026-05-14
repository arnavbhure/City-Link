import { Smartphone } from "lucide-react";

const countryCodes = [
  { code: "+91", label: "IN" },
  { code: "+977", label: "NP" },
  { code: "+880", label: "BD" },
  { code: "+94", label: "LK" },
  { code: "+1", label: "US" },
];

const VendorPhoneInput = ({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  disabled = false,
}) => {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        WhatsApp number
      </span>

      <div className="flex min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/75 transition focus-within:border-emerald-300/50 focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.12)]">
        <select
          value={countryCode}
          onChange={(event) => onCountryCodeChange(event.target.value)}
          disabled={disabled}
          className="w-[5.4rem] shrink-0 border-r border-white/10 bg-slate-950/60 px-2 text-sm font-semibold text-white outline-none disabled:cursor-not-allowed sm:w-24 sm:px-3"
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.label} {country.code}
            </option>
          ))}
        </select>

        <div className="flex min-w-0 flex-1 items-center gap-2 px-3 sm:gap-3 sm:px-4">
          <Smartphone className="h-4 w-4 shrink-0 text-emerald-200 sm:h-5 sm:w-5" />
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={phoneNumber}
            onChange={(event) => onPhoneNumberChange(event.target.value)}
            disabled={disabled}
            placeholder="9876543210"
            className="min-w-0 flex-1 bg-transparent py-3.5 text-base font-semibold text-white outline-none placeholder:text-slate-600 disabled:cursor-not-allowed sm:py-4 sm:text-lg"
          />
        </div>
      </div>
    </label>
  );
};

export default VendorPhoneInput;
