"use client";

import { useState, type ReactNode } from "react";
import GiftFlower from "./Menu";

type MenuShellProps = {
  children: ReactNode;
};

export default function MenuShell({ children }: MenuShellProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-dvh overflow-hidden bg-white">
      <GiftFlower isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        id="invitation-scroll"
        className={`scrollbar-none mx-auto h-dvh w-full max-w-107.5 overflow-x-hidden overflow-y-auto scroll-smooth bg-[#F3F2ED] shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "-translate-x-64" : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
}
