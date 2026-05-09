import { vendorControlClass } from "./VendorFormInput";

const VendorTextarea = ({
  label,
  hint,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
}) => {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-slate-300">
        {label}
        {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`${vendorControlClass} resize-none leading-7`}
      />
    </label>
  );
};

export default VendorTextarea;
