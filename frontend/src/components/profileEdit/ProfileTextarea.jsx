import { useEffect, useRef } from "react";
import { cardShell, helperClass, labelClass } from "./styles";

const ProfileTextarea = ({ label, helper, value, onChange, placeholder }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <label className="block">
      <span className={labelClass}>{label}</span>

      <div className={`${cardShell} mt-3 px-4 py-4`}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className="min-h-28 w-full resize-none bg-transparent text-base leading-7 text-white outline-none placeholder:text-slate-500"
        />
      </div>

      {helper ? <p className={helperClass}>{helper}</p> : null}
    </label>
  );
};

export default ProfileTextarea;
