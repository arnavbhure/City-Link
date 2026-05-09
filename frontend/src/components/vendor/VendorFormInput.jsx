export const vendorControlClass =
  "w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-300/60 focus:bg-slate-950 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]";

const VendorFormInput = ({
  label,
  hint,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  options,
  required = false,
  autoComplete,
  readOnly = false,
  disabled = false,
}) => {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-slate-300">
        {label}
        {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
      </span>

      {options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={vendorControlClass}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          readOnly={readOnly}
          disabled={disabled}
          className={vendorControlClass}
        />
      )}
    </label>
  );
};

export default VendorFormInput;
