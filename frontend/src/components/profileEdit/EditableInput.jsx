import { ChevronDown } from "lucide-react";
import {
  fieldInputClass,
  fieldShellClass,
  helperClass,
  labelClass,
} from "./styles";

const EditableInput = ({
  label,
  helper,
  value,
  onChange,
  name,
  type = "text",
  as = "input",
  placeholder,
  autoComplete,
  inputMode,
  min,
  max,
  step,
  options = [],
  className = "",
}) => {
  return (
    <label className={`block ${className}`}>
      <span className={labelClass}>{label}</span>

      <div className={`${fieldShellClass} mt-3`}>
        {as === "select" ? (
          <div className="relative">
            <select
              name={name}
              value={value}
              onChange={onChange}
              autoComplete={autoComplete}
              className={`${fieldInputClass} appearance-none pr-10`}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            inputMode={inputMode}
            min={min}
            max={max}
            step={step}
            className={fieldInputClass}
          />
        )}
      </div>

      {helper ? <p className={helperClass}>{helper}</p> : null}
    </label>
  );
};

export default EditableInput;
