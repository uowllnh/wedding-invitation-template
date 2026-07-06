"use client";

import { Check, Copy } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
  account: string;
};

export default function AccountButton({
  name,
  type = "button",
  account,
  onClick,
  ...props
}: ButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  async function copyAccount() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(account);
      } else {
        const textarea = document.createElement("textarea");

        textarea.value = account;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setCopied(false);
      }, 1500);

      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }

  return (
    <div className="flex shrink-0 snap-center snap-always">
      <div className="mt-1 flex h-[150px] w-[260px] flex-col items-center justify-center rounded-[13px] bg-white px-2 text-[14px] text-black shadow-[0_0_4px_rgba(0,0,0,0.20)]">
        <div>
          <span className="flex justify-center">{name}</span>
          <span className="mt-2 flex flex-row gap-3">{account}</span>
        </div>
        <button
          type={type}
          aria-label={`${name} 계좌번호 복사`}
          className="flex justify-between w-full py-4 px-3 border-[#e8e8e8] rounded-[7px] border-[0.2px] mt-3"
          onClick={(event) => {
            onClick?.(event);
            void copyAccount();
          }}
          {...props}
        >
          <span className="flex w-full items-center justify-between gap-1.5">
            {copied ? (
              <Check size={15} strokeWidth={1.5} />
            ) : (
              <Copy size={15} strokeWidth={1.3} />
            )}
            <p className="text-[14px] text-[#353535]">
              {copied ? "복사완료" : "계좌번호 복사하기"}
            </p>
          </span>
        </button>
      </div>
    </div>
  );
}
