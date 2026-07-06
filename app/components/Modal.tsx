"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
};

export default function Modal({
  icon,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className="m-1 flex h-13 w-13 items-center justify-center rounded-full bg-white text-[#000000] shadow-lg"
      {...props}
    >
      {icon}
    </button>
  );
}
