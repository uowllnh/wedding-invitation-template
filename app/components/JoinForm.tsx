"use client";

import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";
import FormInput from "./FormInput";
import SelectButton from "./LineButton";

type JoinFormProps = {
  join: boolean;
};

type Gender = "man" | "woman";

export default function JoinForm({ join }: JoinFormProps) {
  const [brideGroom, setBrideGroom] = useState<Gender | null>(null);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [isEat, setIsEat] = useState<boolean | null>(null);
  const [extraGuestCount, setExtraGuestCount] = useState(0);
  const [memo, setMemo] = useState("");
  const [allow, setAllow] = useState(false);

  const hasName = name.trim().length > 0;
  const selectedMeal = isEat !== null;
  const canSubmit = join ? hasName && selectedMeal && allow : hasName;

  function ButtonActivate(act: boolean, text: string) {
    return (
      <button
        disabled={!act}
        type="button"
        className={`flex h-12 w-full shrink-0 items-center justify-center rounded-[8px] border-[1px] px-4 text-[14px] ${
          act
            ? "border-black text-black"
            : "border-[#C9C9C9] bg-white text-[#C9C9C9]"
        } `}
      >
        <span className="flex items-center gap-1.5">{text}</span>
      </button>
    );
  }

  function BooleanButton(a: string, b: string, title: string) {
    return (
      <section>
        <div className="flex flex-row items-center">
          <div className="필수항목 flex w-1 h-1 bg-red-500 rounded-full mr-1" />
          <p className="text-[14px]">{title}</p>
        </div>
        <div className="mt-2 flex gap-8 overflow-y-auto pr-1">
          <SelectButton
            text={a}
            selected={isEat === true}
            onClick={() => setIsEat(true)}
          />
          <SelectButton
            text={b}
            selected={isEat === false}
            onClick={() => setIsEat(false)}
          />
        </div>
      </section>
    );
  }
  function checkForm(title: string, gender: Gender) {
    const selected = brideGroom === gender;

    return (
      <div>
        {selected ? (
          <button
            type="button"
            onClick={() => setBrideGroom(gender)}
            className="text-black flex flex-row items-center gap-1 text-[14px]"
          >
            <div className="bg-black border-2 h-4 w-4 rounded-full flex justify-center items-center ">
              {" "}
              <Check className="text-white" />{" "}
            </div>{" "}
            <strong className="flex items-center ">{title} </strong>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setBrideGroom(gender)}
            className="text-black flex flex-row items-center gap-1 text-[14px]"
          >
            <div className="border-[#b8b8b8] border-2 h-4 w-4 rounded-full flex justify-center items-center ">
              {" "}
              <Check className="text-white" />{" "}
            </div>{" "}
            <strong className="flex items-center">{title} </strong>
          </button>
        )}
      </div>
    );
  }

  function updateExtraGuestCount(count: number) {
    setExtraGuestCount(Math.max(count, 0));
  }

  return (
    <div className="mt-8 flex flex-col gap-5">
      <section className="flex flex-row  justify-between">
        <FormInput
          title="성함"
          hint="성함을 입력해주세요."
          value={name}
          onChange={setName}
        />
        <div className="flex flex-row gap-2 items-center  w-50 ml-5">
          {checkForm("신랑측", "man")}
          {checkForm("신부측", "woman")}
        </div>
      </section>
      <FormInput
        title="연락처"
        hint="참석자 대표 연락처를 입력해주세요."
        value={tel}
        onChange={setTel}
      />
      {join && (
        <section className="mt-6 flex items-center justify-between text-black">
          <div>
            <div className="flex flex-row items-center">
              <div className="필수항목 flex w-1 h-1 bg-red-500 rounded-full mr-1" />
              <p className="text-[14px]">추가인원</p>
            </div>
            <p className="mt-1 text-[12px] text-[#858585]">
              본인 외 함께 참석하는 인원
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="추가인원 감소"
              className="flex size-8 items-center justify-center rounded-full border-[0.5px] border-[#C9C9C9] bg-white disabled:text-[#C9C9C9]"
              disabled={extraGuestCount === 0}
              onClick={() => updateExtraGuestCount(extraGuestCount - 1)}
            >
              <Minus size={15} strokeWidth={1.5} />
            </button>
            <span className="w-5 text-center text-[16px]">
              {extraGuestCount}
            </span>
            <button
              type="button"
              aria-label="추가인원 증가"
              className="flex size-8 items-center justify-center rounded-full border-[0.5px] border-[#C9C9C9] bg-white"
              onClick={() => updateExtraGuestCount(extraGuestCount + 1)}
            >
              <Plus size={15} strokeWidth={1.5} />
            </button>
          </div>
        </section>
      )}
      {join && BooleanButton("식사함", "식사안함", "식사여부")}
      {join && (
        <FormInput
          title="전달사항"
          hint="전달하실 내용을 입력해 주세요."
          value={memo}
          onChange={setMemo}
        />
      )}

      <button
        type="button"
        onClick={() => setAllow((prev) => !prev)}
        className="rounded-[8px] border-1  border-[#ebebeb] p-2 py-4 flex gap-2"
      >
        {" "}
        <span
          className={`flex items-center justify-center rounded-[4px] border-1 ${
            allow ? "h-5 w-5 border-black bg-black" : "h-5 w-5 border-[#b8b8b8]"
          }`}
        >
          <Check className="text-white" />
        </span>
        <div className="flex flex-col text-left">
          <strong className=" text-[14px]"> 동의합니다. </strong>
          <span className="text-[14px]">
            {" "}
            참석여부 전달을 위한 개인정보 수집 및 이용에 동의해주세요. <br />
            항목: 성함,연락처,동행인 성함 · 보유기간: 청첩장 이용
            종료시까지{" "}
          </span>
        </div>
      </button>

      {ButtonActivate(canSubmit, "신랑&신부에게 보내기")}
    </div>
  );
}
