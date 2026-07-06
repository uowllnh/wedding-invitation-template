"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import Modal from "./Modal";
import {
  Armchair,
  CalendarDays,
  Flag,
  Gift,
  Heart,
  Images,
  MapPin,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";

type GiftFlowerProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const menuItems = [
  { label: "인사말", icon: Heart, targetId: "greetings" },
  { label: "일정", icon: CalendarDays, targetId: "schedule" },
  { label: "전달사항", icon: Flag, targetId: "information" },
  { label: "참석여부", icon: Armchair, targetId: "rsvp" },
  { label: "오시는 길", icon: MapPin, targetId: "location" },
  { label: "갤러리", icon: Images, targetId: "gallery" },
  { label: "방명록", icon: MessageCircle, targetId: "guestbook" },
  { label: "마음 전하기", icon: Gift, targetId: "account" },
];

export default function GiftFlower({ isOpen, setIsOpen }: GiftFlowerProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(isOpen);

  useEffect(() => {
    const timer = window.setTimeout(
      () => {
        setIsMenuVisible(isOpen);
      },
      isOpen ? 0 : 300,
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  const handleMenuClick = (targetId: string) => {
    setIsOpen(false);

    window.setTimeout(() => {
      const scrollContainer = document.getElementById("invitation-scroll");
      const target = document.getElementById(targetId);

      if (!scrollContainer || !target) {
        return;
      }

      const containerTop = scrollContainer.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      const scrollTop =
        targetTop - containerTop + scrollContainer.scrollTop - 24;

      scrollContainer.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }, 300);
  };

  return (
    <>
      <div className="absolute bottom-3 left-1/2 ml-32 z-40 mr-2 flex flex-col items-end gap-2">
        <Modal
          icon={<Menu />}
          onClick={() => {
            setIsOpen((current) => !current);
          }}
        />
      </div>
      {isMenuVisible && (
        <section
          aria-hidden={!isOpen}
          className={`fixed inset-0 z-[9999] flex justify-center transition-opacity duration-300 ease-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-dvh w-full max-w-107.5 overflow-hidden">
            <button
              type="button"
              aria-label="메뉴 닫기"
              className="absolute inset-0 cursor-default"
              onClick={() => {
                setIsOpen(false);
              }}
            />
            <aside
              className={`absolute inset-y-0 right-0 flex w-64 flex-col bg-white px-6 py-7 shadow-[-12px_0_30px_rgba(0,0,0,0.16)] transition-transform duration-300 ease-out ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="mb-10 flex items-center justify-between">
                <p className="text-sm font-medium text-[#202020]">MENU</p>
                <button
                  type="button"
                  aria-label="메뉴 닫기"
                  className="flex size-9 items-center justify-center rounded-full text-[#606060]"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {menuItems.map(({ label, icon: Icon, targetId }) => (
                  <button
                    key={label}
                    type="button"
                    className="flex h-12 items-center gap-3 rounded-[8px] px-2 text-left text-sm text-[#303030]"
                    onClick={() => {
                      handleMenuClick(targetId);
                    }}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </aside>
          </div>
        </section>
      )}
    </>
  );
}
