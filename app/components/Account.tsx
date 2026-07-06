"use client";

import { useState } from "react";
import AccountButton from "./AccountButton";
import Section from "./Section";

const ACCOUNT_SIDE = {
  man: "man",
  woman: "woman",
} as const;

type AccountSide = (typeof ACCOUNT_SIDE)[keyof typeof ACCOUNT_SIDE];

export default function Account() {
  const [selectedSide, setSelectedSide] = useState<AccountSide>(
    ACCOUNT_SIDE.man,
  );
  const isMan = selectedSide === ACCOUNT_SIDE.man;

  return (
    <section>
      <Section
        entitle="ACCOUNT"
        title="마음 전하실 곳"
        text={
          <>
            참석이 어려우신 분들을 위해
            <br />
            계좌번호를 기재하였습니다.
            <br />
            너그러운 마음으로 양해 부탁드립니다.
          </>
        }
      >
        <section className="text-[15px] mt-10 w-[162px] h-[48px] bg-[#DDDDDD] rounded-[24px] flex flex-row justify-between items-center px-[2px]">
          <button
            type="button"
            onClick={() => setSelectedSide(ACCOUNT_SIDE.man)}
            className={`w-[90px] h-[44px] rounded-[40px] ${
              isMan
                ? "bg-[#ffffff]  text-black"
                : "bg-transparent  text-[#BBBBBB]"
            }`}
          >
            {" "}
            신랑측{" "}
          </button>
          <button
            type="button"
            onClick={() => setSelectedSide(ACCOUNT_SIDE.woman)}
            className={`w-[90px] h-[44px] rounded-[40px] ${
              isMan
                ? "bg-transparent  text-[#BBBBBB]"
                : "bg-[#ffffff]  text-black"
            }`}
          >
            {" "}
            신부측{" "}
          </button>
        </section>
      </Section>

      <div className="scrollbar-none flex w-full h-[160px] mt-16 snap-x snap-mandatory flex-row gap-7 overflow-x-auto overscroll-x-contain px-[calc((100%-260px)/2)] scroll-px-[calc((100%-260px)/2)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {isMan ? (
          <>
            <AccountButton name="김민준" account="국민은행 110-1234-5678" />
            <AccountButton name="김아버지" account="국민은행 110-4321-9876" />
          </>
        ) : (
          <>
            <AccountButton name="김유라" account="카카오뱅크 3333-18-8602273" />
            <AccountButton name="김어머니" account="농협은행 110-9876-4545" />
          </>
        )}
      </div>
    </section>
  );
}
