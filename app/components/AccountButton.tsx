import { Copy } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import Image from "next/image";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
  account: string;
};

export default function AccountButton({
  name,
  type = "button",
  account,
  ...props
}: ButtonProps) {
  return (
    <div className="flex shrink-0 snap-center snap-always">
      <div className="mt-1 flex h-[150px] w-[260px] flex-col items-center justify-center rounded-[13px] bg-white px-2 text-[14px] text-black shadow-[0_0_4px_rgba(0,0,0,0.20)]">
        <button type={type} {...props}>
          <span>{name}</span>
          <span className="flex flex-row gap-3 mt-2">
            {account}
            <Copy size={15} strokeWidth={1.3} />
          </span>
        </button>
        <button
          type={type}
          className="flex justify-between w-full py-3.5 px-3 border-[#dedede] rounded-[7px] border-[0.2px] mt-3"
        >
          <span className="flex justify-between w-full">
            <Image
              src="/kakaopay.svg"
              alt="카카오페이"
              width={12}
              height={12}
            />
            <p className="text-[13px]">카카오페이</p>
          </span>
        </button>
      </div>
    </div>
  );
}
