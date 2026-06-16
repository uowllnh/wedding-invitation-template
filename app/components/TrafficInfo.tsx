import type { ReactNode } from "react";

type InfoItem = {
  sucle?: string;
  icon?: ReactNode;
  text?: ReactNode;
};

type TextItemProps = {
  main?: {
    icon?: ReactNode;
    text?: ReactNode;
  };
  sub?: {
    icon?: ReactNode;
    text?: ReactNode;
  };
  info?: InfoItem[];
};

export default function TrafficInfo({ main, sub, info }: TextItemProps) {
  return (
    <div className="flex w-full flex-col items-start text-left">
      {main && (
        <section className="flex flex-row items-center gap-1.5 text-[#000000]">
          {main.icon}
          <div className="text-[16px]">{main.text}</div>
        </section>
      )}

      {sub && (
        <section className="mt-2 flex flex-row items-center gap-1  text-[#757575]">
          {sub.icon}
          <div className="text-[12px]">{sub.text}</div>
        </section>
      )}
      <section className="mt-3 flex flex-col items-start gap-2">
        {info?.map((item, index) => (
          <section className="flex flex-row items-start gap-1" key={index}>
            {item.icon ? (
              <section>{item.icon}</section>
            ) : (
              <div
                className="mt-1 h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.sucle }}
              />
            )}
            <div className="text-[12px] text-[#222222]">{item.text}</div>
          </section>
        ))}
      </section>
    </div>
  );
}
