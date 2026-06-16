"use client";

import {
  BusFront,
  CircleParking,
  MapPinned,
  MousePointer2,
  TramFront,
} from "lucide-react";
import Section from "./Section";
import Image from "next/image";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Button from "./Button";
import TrafficInfo from "./TrafficInfo";
import Line from "./Line";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  text: string;
};

export function pkbt(text: string) {
  return (
    <div className="bg-white text-[#000000] text-[13px] px-2 rounded-[11px] border-[0.5px] border-[#C9C9C9]">
      {" "}
      <p>{text}</p>{" "}
    </div>
  );
}

export function LocationBt({
  icon,
  className = "",
  type = "button",
  text,
  ...props
}: ButtonProps) {
  return (
    <div className="flex">
      <button
        type={type}
        className={`flex-1 w-[108px] px-3 mt-16 flex h-12 items-center justify-center gap-1.75 rounded-[11px] border-[0.5px] border-[#C9C9C9] bg-white text-[12px] text-black  ${className}`}
        {...props}
      >
        {icon && (
          <span className="flex items-center justify-center [&>svg]:size-4 [&>svg]:shrink-0">
            {icon}
          </span>
        )}
        {text}
      </button>
    </div>
  );
}

export default function Location() {
  return (
    <Section
      entitle="LOCATION"
      title="오시는 길"
      text="L7 광명 바이 롯데호텔 3F 스튜디오홀"
      className="relative"
    >
      <p className="text-[15px] text-[#858585]">경기 광명시 신길로 22</p>
      <p className="text-[12px] mt-8">Tel. 02-2000-7100</p>
      <Button icon={<MapPinned strokeWidth={1.5} />} text="약도 이미지 보기" />

      <p className="text-[15px] mt-24">네비게이션</p>
      <p className="text-[13px] mt-4 text-[#757575]">
        원하는 앱 버튼을 누르시면 길 안내가 연결됩니다.
      </p>
      <div className="flex flex-row gap-6">
        <LocationBt
          className="w-10"
          icon={
            <Image
              src="/naver-map.png"
              alt="네이버지도"
              width={20}
              height={20}
            />
          }
          text="네이버지도"
        />
        <LocationBt
          icon={<Image src="/t-map.png" alt="티맵" width={22} height={22} />}
          text="티맵"
        />
        <LocationBt
          icon={
            <Image
              src="/kakao-map.png"
              alt="카카오네비"
              width={20}
              height={20}
              className="rounded-[5px]"
            />
          }
          text="카카오네비"
        />
      </div>
      <div className="mt-16 ml-13 flex flex-col w-full justify-start">
        <TrafficInfo
          main={{
            icon: <CircleParking strokeWidth={1} />,
            text: "주차 안내",
          }}
          sub={{
            icon: <MousePointer2 strokeWidth={2} width={14} height={14} />,
            text: "L7 광명 바이 롯데호텔 또는 광명 유플래닛 주차장 검색",
          }}
          info={[
            {
              icon: pkbt("B3"),
              text: "HO구역",
            },
            {
              icon: pkbt("B4"),
              text: "LB구역 16,20 ~ 24",
            },
            {
              icon: pkbt("B5"),
              text: (
                <>
                  HO구역 01~04 <span className="text-[#A1A1A1]">|</span> LB구역
                  13, 19, 22 <span className="text-[#A1A1A1]">|</span> U구역
                  01~02
                </>
              ),
            },
            {
              text: (
                <>해당 구역에 주차하시면 호텔 엘리베이터 이용이 편리합니다.</>
              ),
            },
          ]}
        />
        <Line className="my-8.5 w-75 -ml-13 self-center" />
        <TrafficInfo
          main={{
            icon: <TramFront strokeWidth={1} />,
            text: "지하철",
          }}
          info={[
            {
              sucle: "#000FB4",
              text: "1호선 광명역 (1호선 광명행) 서편 1번 출구",
            },
            {
              sucle: "#000FB4",
              text: (
                <div>
                  1호선 관악역 1번 출구 <br /> (마을버스1-1광명역 데시앙,
                  일직동행정복지센터)
                </div>
              ),
            },
          ]}
        />
        <Line className="w-75 my-8.5 -ml-13 self-center" />
        <TrafficInfo
          main={{
            icon: <BusFront strokeWidth={1} />,
            text: "버스",
          }}
          info={[
            {
              sucle: "#009630",
              text: "지선버스 : 5627, 5633",
            },
            {
              sucle: "#D90000",
              text: "직행버스 : 3001, 3002, 8507, G9633, G8808",
            },
            {
              sucle: "#8EE100",
              text: "일반버스 : 3, 8-2, 11-3, 12, 17, 22, 50, 75, 102",
            },
            {
              sucle: "#8EE100",
              text: "마을버스 : 1-1, 1-3",
            },
          ]}
        />
      </div>
    </Section>
  );
}
