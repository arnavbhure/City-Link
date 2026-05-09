import { useRef } from "react";

const OTP_LENGTH = 6;

const VendorOtpInput = ({ value, onChange, disabled = false }) => {
  const inputRefs = useRef([]);
  const digits = Array.from({ length: OTP_LENGTH }, (_, index) => value[index] || "");

  const updateDigit = (index, nextValue) => {
    const nextDigit = nextValue.replace(/\D/g, "").slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = nextDigit;
    onChange(nextDigits.join(""));

    if (nextDigit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    onChange(pastedValue);
    inputRefs.current[Math.min(pastedValue.length, OTP_LENGTH - 1)]?.focus();
  };

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-slate-300">
        Enter verification code
      </p>
      <div className="grid grid-cols-6 gap-2 sm:gap-3" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(event) => updateDigit(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            aria-label={`OTP digit ${index + 1}`}
            className="aspect-square min-h-12 rounded-2xl border border-white/10 bg-slate-950/75 text-center text-xl font-bold text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300/60 focus:bg-slate-950 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.12)] disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-14"
          />
        ))}
      </div>
    </div>
  );
};

export default VendorOtpInput;
