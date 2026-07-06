"use client";

import { MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import Button from "./Button";

const CONTACT_GROUPS = [
  {
    title: "신랑측",
    contacts: [
      {
        name: "김민준",
        phone: "010-1234-5678",
        roll: "신랑",
      },
      {
        name: "김아버지",
        phone: "010-1234-5678",
        roll: "아버지",
      },
      {
        name: "김어머니",
        phone: "010-1234-5678",
        roll: "어머니",
      },
    ],
  },
  {
    title: "신부측",
    contacts: [
      {
        name: "김유라",
        phone: "010-9876-5432",
        roll: "신부",
      },
      {
        name: "김아버지",
        phone: "010-9876-5432",
        roll: "아버지",
      },
      {
        name: "김어머니",
        phone: "010-9876-5432",
        roll: "어머니",
      },
    ],
  },
] as const;

export default function ContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        icon={<Phone />}
        text="연락하기"
        onClick={() => setIsOpen(true)}
      />

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
                연락하기
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

            <div className="mt-10 flex flex-col gap-8 overflow-y-auto pr-1">
              {CONTACT_GROUPS.map((group) => (
                <section key={group.title}>
                  <strong className="ml-2 text-[13px] text-black">
                    {group.title}
                  </strong>

                  <div className="flex flex-col gap-3 mt-3">
                    {group.contacts.map((contact) => (
                      <div
                        key={`${group.title}-${contact.name}`}
                        className="rounded-[7px] border-[0.5px] border-[#D8D8D8] px-4 py-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-row">
                            <strong className="text-[12px] w-12 items-center flex text-[#8b8b8b]">
                              {contact.roll}
                            </strong>
                            <strong className="text-[14px]">
                              {contact.name}
                            </strong>
                          </div>

                          <div className="grid grid-cols-2 gap-2 w-35">
                            <a
                              href={`tel:${contact.phone}`}
                              className="flex h-10 items-center justify-center gap-1.5 rounded-full border-[#cacaca] border-[0.5px] text-[14px]"
                            >
                              <Phone size={15} strokeWidth={1.5} />
                            </a>
                            <a
                              href={`sms:${contact.phone}`}
                              className="flex h-10 items-center justify-center gap-1.5 rounded-full border-[#cacaca] border-[0.5px] text-[14px]"
                            >
                              <MessageCircle size={15} strokeWidth={1.5} />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
