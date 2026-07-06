import type { HTMLInputTypeAttribute } from "react";

type FormInputProps = {
  title: string;
  hint: string;
  value: string;
  inputType?: HTMLInputTypeAttribute;
  required?: boolean;
  multiline?: boolean;
  className?: string;
  onChange: (value: string) => void;
};

export default function FormInput({
  title,
  hint,
  value,
  inputType = "text",
  className,
  required = false,
  multiline = false,
  onChange,
}: FormInputProps) {
  const inputClassName = `rounded-[8px] text-[15px] text-black outline-none placeholder:text-[#B8B8B8] focus:border-black ${className ?? "h-5"}`;

  return (
    <label className={`mt-6 flex w-full flex-col gap-2`}>
      <div className="flex flex-row items-center">
        {required && (
          <div className="필수항목 flex w-1 h-1 bg-red-500 rounded-full mr-1" />
        )}
        <span className="text-[14px] text-black">{title}</span>{" "}
      </div>
      {multiline ? (
        <textarea
          value={value}
          placeholder={hint}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClassName} resize-none`}
        />
      ) : (
        <input
          type={inputType}
          value={value}
          placeholder={hint}
          onChange={(event) => onChange(event.target.value)}
          className={inputClassName}
        />
      )}
      <div className="h-[0.5px] bg-[#B8B8B8]" />
    </label>
  );
}
