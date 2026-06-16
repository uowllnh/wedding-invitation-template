"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const WEDDING_DATE = "2026-09-19T11:00:00+09:00";

type TimeType = "days" | "hour" | "min" | "sec";

function TimeItem({ time, type }: { type: TimeType; time: number }) {
  return (
    <section className="flex flex-col items-center">
      <p className="text-[12px] uppercase text-[#00000044]">{type}</p>
      <p className="text-[24px] text-black">{String(time).padStart(2, "0")}</p>
    </section>
  );
}

export default function WeddingSchedule() {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    const targetTime = new Date(WEDDING_DATE).getTime();

    const updateRemainingTime = () => {
      setRemainingTime(Math.max(targetTime - Date.now(), 0));
    };

    updateRemainingTime();
    const timer = window.setInterval(updateRemainingTime, 1000);

    return () => window.clearInterval(timer);
  }, [WEDDING_DATE]);

  const totalSeconds = Math.floor((remainingTime ?? 0) / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hour = Math.floor((totalSeconds % 86_400) / 3_600);
  const min = Math.floor((totalSeconds % 3_600) / 60);
  const sec = totalSeconds % 60;

  return (
    <section className="mb-21 flex w-full flex-col items-center text-black">
      {remainingTime !== null && (
        <div className="mt-10 w-full text-center">
          <>
            <div className="flex w-full items-end justify-center">
              <TimeItem time={days} type="days" />
              <span className="flex text-[10px] h-9 w-6 items-center justify-center  text-[#00000044]">
                :
              </span>
              <TimeItem time={hour} type="hour" />
              <span className="flex text-[10px] h-9 w-6 items-center justify-center  text-[#00000044]">
                :
              </span>
              <TimeItem time={min} type="min" />
              <span className="flex text-[10px] h-9 w-6 items-center justify-center  text-[#00000044]">
                :
              </span>
              <TimeItem time={sec} type="sec" />
            </div>
            <p className="mt-3 text-[14px] text-black">
              건호, 유리의 결혼식이 <strong>{days}일 </strong> 남았습니다.
            </p>{" "}
          </>
        </div>
      )}
      <Image
        src="/main2.png"
        alt="서브 이미지"
        width={300}
        height={221}
        className="mt-17"
      />
    </section>
  );
}
