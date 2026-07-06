"use client";

import { Armchair, Smile, X } from "lucide-react";
import Button from "./Button";
import Section from "./Section";
import { useState } from "react";
import SelectButton from "./LineButton";
import JoinForm from "./JoinForm";

export default function RSVP() {
  const [isOpen, setIsOpen] = useState(false);
  const [isJoin, setIsJoin] = useState<boolean | null>(null);
  return (
    <>
      <Section
        entitle="R.S.V.P"
        title="참석 의사 전달"
        smtext={
          <>
            신랑, 신부에게 참석의사를
            <br />
            미리 전달할 수 있어요.
          </>
        }
      >
        <Button
          icon={<Smile />}
          text="참석의사 전달하기"
          onClick={() => setIsOpen(true)}
        />
      </Section>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
          onClick={() => setIsOpen(false)}
        >
          <section
            className="flex h-full w-full max-w-107.5 flex-col bg-white px-5 py-5 text-black"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center">
              <strong
                id="contact-title"
                className="text-[17px] w-full ml-8 text-center"
              >
                참석 의사 전달
              </strong>
              <button
                type="button"
                aria-label="닫기"
                className="flex size-8 items-center justify-center rounded-full text-[#606060]"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-10 flex-1 overflow-y-auto scrollbar-none pr-1">
              <div className="flex gap-8">
                <SelectButton
                  text="참석"
                  selected={isJoin === true}
                  onClick={() => setIsJoin(true)}
                  icon={
                    <div>
                      <Armchair />{" "}
                    </div>
                  }
                />
                <SelectButton
                  text="불참"
                  selected={isJoin === false}
                  onClick={() => setIsJoin(false)}
                  icon={
                    <div className="relative">
                      <div className="absolute flex h-[5px] -left-0.5 top-2.5 rounded-full w-7 rotate-45 bg-black border-white border-[1.5px]" />
                      <Armchair />
                    </div>
                  }
                />
              </div>
              {isJoin !== null && <JoinForm join={isJoin} />}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
