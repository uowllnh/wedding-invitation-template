import { Check } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type SelectButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  text: string;
  selected?: boolean;
};

export default function LineButton({
  icon,
  className = "",
  type = "button",
  text,
  selected = false,
  ...props
}: SelectButtonProps) {
  return (
    <button
      type={type}
      className={`flex h-12 min-w-0 flex-1 items-center justify-between gap-1.5 rounded-[8px] border-[1px] px-4 text-[14px] ${
        selected
          ? "border-black text-black"
          : "border-[#C9C9C9] bg-white text-black"
      } ${className}`}
      {...props}
    >
      <span className="flex items-center gap-1.5">
        {icon && (
          <span className="flex items-center justify-center [&>svg]:size-4 [&>svg]:shrink-0">
            {icon}
          </span>
        )}
        {text}
      </span>
      <span
        className={`flex items-center justify-center rounded-full border-2 ${
          selected
            ? "h-5 w-5 border-black bg-black"
            : "h-5 w-5 border-[#b8b8b8]"
        }`}
      >
        <Check className="text-white" />
      </span>
    </button>
  );
}
