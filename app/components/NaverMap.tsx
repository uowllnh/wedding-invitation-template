"use client";

import { useEffect, useRef, useState } from "react";

type NaverMapProps = {
  lat: number;
  lng: number;
  title: string;
};

type NaverLatLng = new (lat: number, lng: number) => unknown;
type NaverMapConstructor = new (
  element: HTMLElement,
  options: {
    center: unknown;
    zoom: number;
    minZoom?: number;
    zoomControl?: boolean;
  },
) => unknown;
type NaverMarkerConstructor = new (options: {
  position: unknown;
  map: unknown;
  title: string;
}) => unknown;

declare global {
  interface Window {
    naver?: {
      maps: {
        LatLng: NaverLatLng;
        Map: NaverMapConstructor;
        Marker: NaverMarkerConstructor;
      };
    };
  }
}

const NAVER_MAP_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
const NAVER_MAP_SCRIPT_ID = "naver-map-script";
type MapStatus = "loading" | "ready" | "error";

function removeCurrentScript() {
  document.getElementById(NAVER_MAP_SCRIPT_ID)?.remove();
}

function appendNaverMapScript(
  clientId: string,
  keyName: "ncpKeyId" | "ncpClientId",
) {
  removeCurrentScript();

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");

    script.id = NAVER_MAP_SCRIPT_ID;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?${keyName}=${clientId}`;
    script.async = true;
    script.onload = () => {
      if (window.naver?.maps) {
        resolve();
        return;
      }

      reject(new Error("네이버지도 객체를 찾을 수 없습니다."));
    };
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

async function loadNaverMapScript(clientId: string) {
  if (window.naver?.maps) {
    return;
  }

  try {
    await appendNaverMapScript(clientId, "ncpKeyId");
  } catch {
    await appendNaverMapScript(clientId, "ncpClientId");
  }
}

export default function NaverMap({ lat, lng, title }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<MapStatus>("loading");

  useEffect(() => {
    if (!NAVER_MAP_CLIENT_ID || !mapRef.current) {
      return;
    }

    let ignore = false;

    void loadNaverMapScript(NAVER_MAP_CLIENT_ID)
      .then(() => {
        if (ignore || !mapRef.current || !window.naver?.maps) {
          return;
        }

        const center = new window.naver.maps.LatLng(lat, lng);
        const map = new window.naver.maps.Map(mapRef.current, {
          center,
          zoom: 16,
          minZoom: 10,
          zoomControl: false,
        });

        new window.naver.maps.Marker({
          position: center,
          map,
          title,
        });

        setStatus("ready");
      })
      .catch(() => {
        if (!ignore) {
          setStatus("error");
        }
      });

    return () => {
      ignore = true;
    };
  }, [lat, lng, title]);

  if (!NAVER_MAP_CLIENT_ID) {
    return (
      <div className="mt-10 flex h-60 w-full max-w-95 flex-col items-center justify-center rounded-[8px] border-[0.5px] border-[#D8D8D8] bg-white px-6 text-center">
        <p className="text-[14px] text-black">
          네이버지도 API 키가 필요합니다.
        </p>
        <p className="mt-2 text-[12px] leading-5 text-[#858585]">
          .env.local에 NEXT_PUBLIC_NAVER_MAP_CLIENT_ID를 추가하면 이 영역에
          지도가 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="relative mt-10 h-60 w-full overflow-hidden bg-white">
      <div
        ref={mapRef}
        className="h-full w-full"
        aria-label={`${title} 네이버지도`}
      />
      {status !== "ready" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white px-6 text-center">
          {status === "loading" ? (
            <p className="text-[13px] text-[#858585]">
              네이버지도를 불러오는 중입니다.
            </p>
          ) : (
            <>
              <p className="text-[14px] text-black">
                네이버지도를 불러오지 못했습니다.
              </p>
              <p className="mt-2 text-[12px] leading-5 text-[#858585]">
                콘솔의 Maps 인증 도메인에 현재 접속 주소를 추가한 뒤 dev 서버를
                재시작해주세요.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
