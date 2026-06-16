import type { ReactNode } from "react";

type SectionProps = {
  entitle: string;
  title: string;
  text?: ReactNode;
  smtext?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export default function Section({
  entitle,
  title,
  text,
  smtext,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      className={`mt-33.5 flex flex-col items-center justify-center px-6 ${className}`}
    >
      <p className="mb-4 text-xs tracking-[0.15em] text-[#858585]">{entitle}</p>
      <h2 className="mb-10 text-xl text-black">{title}</h2>

      <div className="text-center text-[15px] leading-7 text-black">{text}</div>
      <div className="text-center text-[13px] leading-7 text-black">
        {smtext}
      </div>
      <div className="text-center text-[15px] leading-7 text-[#858585]"></div>
      {children}
    </section>
  );
}
