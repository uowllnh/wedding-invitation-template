// app/components/WeddingCalendar.tsx
import { Heart } from "lucide-react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const days = Array.from({ length: 35 }, (_, index) => {
  const day = index - 1; // 2026년 9월 1일은 화요일
  return day >= 1 && day <= 30 ? day : null;
});

export default function WeddingCalendar() {
  return (
    <section className="w-full px-8 text-center text-black">
      <section className="flex flex-col items-center mt-30 mb-21">
        {" "}
        <p className="text-[24px] tracking-[0.08em]">2026.09.19</p>
        <p className="text-[16px] text-[#4f4f4f]">토요일 오전 11시</p>
      </section>

      <div className="grid grid-cols-7 gap-y-4 text-[14px]">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={index === 0 ? "text-[#8F8F8F]" : "text-black"}
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            className={`flex h-8 items-center justify-center ${
              index % 7 === 0 ? "text-[#8F8F8F]" : "text-black"
            }`}
          >
            {day === 19 ? (
              <span className="relative flex items-center justify-center">
                <span
                  aria-hidden="true"
                  className="relative inset-0 flex items-center justify-center leading-none "
                >
                  <Heart
                    aria-hidden="true"
                    className="absolute ml-px size-9 fill-[#C3CF9E] text-[#C3CF9E]"
                  />
                  <span className="relative z-10 text-white">{day}</span>{" "}
                </span>
              </span>
            ) : (
              day
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
