import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  text: string;
};

export default function Button({
  icon,
  className = "",
  type = "button",
  text,
  ...props
}: ButtonProps) {
  return (
    <div className="flex">
      <button
        type={type}
        className={`flex-1 min-w-44.5 px-10 mt-16 flex h-12 items-center justify-center gap-1.75 rounded-[11px] border-[0.3px] border-[#C9C9C9] bg-white text-[15px] text-black  ${className}`}
        {...props}
      >
        {icon && (
          <span className="flex items-center justify-center [&>svg]:size-4 [&>svg]:shrink-0">
            {icon}
          </span>
        )}
        {text}
      </button>
    </div>
  );
}
