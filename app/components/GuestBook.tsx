"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { Pencil, Trash2, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { db } from "../lib/firebase";
import Button from "./Button";
import FormInput from "./FormInput";
import Section from "./Section";

type GuestBookEntry = {
  id: string;
  name: string;
  text: string;
  passwordHash: string;
  createdAt: Date | Timestamp | null;
};

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_GUESTBOOK_ADMIN_PASSWORD ?? "";
const LOCAL_GUEST_BOOK_KEY = "wedding-guest-book";

type LocalGuestBookEntry = Omit<GuestBookEntry, "createdAt"> & {
  createdAt: string | null;
};

async function hashPassword(password: string) {
  const encodedPassword = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedPassword);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function formatDate(createdAt: Date | Timestamp | null) {
  if (!createdAt) {
    return "";
  }

  const date = createdAt instanceof Timestamp ? createdAt.toDate() : createdAt;

  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function loadLocalEntries() {
  if (typeof window === "undefined") {
    return [];
  }

  const savedEntries = window.localStorage.getItem(LOCAL_GUEST_BOOK_KEY);

  if (!savedEntries) {
    return [];
  }

  try {
    return (JSON.parse(savedEntries) as LocalGuestBookEntry[]).map((entry) => ({
      ...entry,
      createdAt: entry.createdAt ? new Date(entry.createdAt) : null,
    }));
  } catch {
    return [];
  }
}

function saveLocalEntries(entries: GuestBookEntry[]) {
  const localEntries: LocalGuestBookEntry[] = entries.map((entry) => ({
    ...entry,
    createdAt:
      entry.createdAt instanceof Timestamp
        ? entry.createdAt.toDate().toISOString()
        : (entry.createdAt?.toISOString() ?? null),
  }));

  window.localStorage.setItem(
    LOCAL_GUEST_BOOK_KEY,
    JSON.stringify(localEntries),
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "알 수 없는 오류";
}

export default function GuestBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GuestBookEntry | null>(null);
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [showAllEntries, setShowAllEntries] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit =
    name.trim().length > 0 &&
    text.trim().length > 0 &&
    password.trim().length > 0 &&
    !isSubmitting;
  const visibleEntries = showAllEntries ? entries : entries.slice(0, 3);
  const hasMoreEntries = entries.length > 3;

  useEffect(() => {
    if (!db) {
      const timer = window.setTimeout(() => {
        setEntries(loadLocalEntries());
      }, 0);

      return () => {
        window.clearTimeout(timer);
      };
    }

    const guestBookQuery = query(
      collection(db, "guestBook"),
      orderBy("createdAt", "desc"),
    );

    return onSnapshot(
      guestBookQuery,
      (snapshot) => {
        setEntries(
          snapshot.docs.map((entry) => {
            const data = entry.data();

            return {
              id: entry.id,
              name: String(data.name ?? ""),
              text: String(data.text ?? ""),
              passwordHash: String(data.passwordHash ?? ""),
              createdAt:
                data.createdAt instanceof Timestamp ? data.createdAt : null,
            };
          }),
        );
      },
      (error) => {
        setMessage(`Firebase 조회 실패: ${getErrorMessage(error)}`);
      },
    );
  }, []);

  async function submitGuestBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const newEntry = {
        name: name.trim(),
        text: text.trim().slice(0, 500),
        passwordHash: await hashPassword(password),
      };

      if (db) {
        await addDoc(collection(db, "guestBook"), {
          ...newEntry,
          createdAt: serverTimestamp(),
        });
      } else {
        const nextEntries = [
          {
            ...newEntry,
            id: crypto.randomUUID(),
            createdAt: new Date(),
          },
          ...entries,
        ];

        setEntries(nextEntries);
        saveLocalEntries(nextEntries);
      }

      setName("");
      setText("");
      setPassword("");
      setIsOpen(false);
    } catch (error) {
      setMessage(`Firebase 저장 실패: ${getErrorMessage(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deleteGuestBook() {
    if (!deleteTarget) {
      return;
    }

    const isAdmin =
      ADMIN_PASSWORD.length > 0 && deletePassword === ADMIN_PASSWORD;
    const isAuthor =
      deleteTarget.passwordHash === (await hashPassword(deletePassword));

    if (!isAdmin && !isAuthor) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      if (db) {
        await deleteDoc(doc(db, "guestBook", deleteTarget.id));
      } else {
        const nextEntries = entries.filter(
          (entry) => entry.id !== deleteTarget.id,
        );

        setEntries(nextEntries);
        saveLocalEntries(nextEntries);
      }

      setDeleteTarget(null);
      setDeletePassword("");
      setMessage("");
    } catch (error) {
      setMessage(`삭제 실패: ${getErrorMessage(error)}`);
    }
  }

  return (
    <>
      <Section
        entitle="GUESTBOOK"
        title="방명록"
        text={
          <>
            신랑, 신부의
            <br />
            결혼을 축하해주세요.
          </>
        }
      >
        <Button
          icon={<Pencil />}
          text="방명록 작성하기"
          onClick={() => {
            setMessage("");
            setIsOpen(true);
          }}
        />
      </Section>

      <section className="mx-auto mt-10 flex w-full max-w-107.5 flex-col gap-3 px-8">
        {visibleEntries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-[8px] border-[0.5px] border-[#D8D8D8] bg-white px-4 py-3 text-black"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <strong className="text-[14px]">{entry.name}</strong>
                <p className="mt-1 whitespace-pre-wrap text-[13px] leading-5 text-[#606060]">
                  {entry.text}
                </p>
                {entry.createdAt && (
                  <span className="mt-2 block text-[11px] text-[#A1A1A1]">
                    {formatDate(entry.createdAt)}
                  </span>
                )}
              </div>
              <button
                type="button"
                aria-label={`${entry.name} 방명록 삭제`}
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#858585]"
                onClick={() => {
                  setDeleteTarget(entry);
                  setDeletePassword("");
                  setMessage("");
                }}
              >
                <Trash2 size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}
        {hasMoreEntries && (
          <button
            type="button"
            className="mt-2 flex h-10 items-center justify-center text-[#646464] text-[13px]"
            onClick={() => {
              setShowAllEntries((current) => !current);
            }}
          >
            {showAllEntries ? "접기" : "더보기"}
          </button>
        )}
      </section>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
          onClick={() => {
            setMessage("");
            setIsOpen(false);
          }}
        >
          <form
            onSubmit={submitGuestBook}
            className="flex h-full w-full max-w-107.5 flex-col bg-white px-5 py-5 text-black"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center">
              <strong
                id="contact-title"
                className="text-[17px] w-full ml-8 text-center"
              >
                방명록 작성하기
              </strong>
              <button
                type="button"
                aria-label="닫기"
                className="flex size-8 items-center justify-center rounded-full text-[#606060]"
                onClick={() => {
                  setMessage("");
                  setIsOpen(false);
                }}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-10 flex flex-1 flex-col gap-15 pr-1 [&>label]:mt-0">
              <FormInput
                title="이름"
                hint="이름을 입력해주세요."
                value={name}
                required
                onChange={setName}
              />
              <FormInput
                title="내용"
                hint="내용을 작성해주세요. (최대 500자)"
                value={text}
                required
                className="h-20"
                multiline
                onChange={(value) => setText(value.slice(0, 500))}
              />
              <FormInput
                title="비밀번호"
                hint="비밀번호를 입력해주세요."
                value={password}
                inputType="password"
                required
                onChange={setPassword}
              />
              {message && <p className="text-[12px] text-red-500">{message}</p>}
            </div>
            <div className="flex justify-end">
              <Button
                text={isSubmitting ? "저장중" : "작성완료"}
                type="submit"
                disabled={!canSubmit}
                className={!canSubmit ? "text-[#C9C9C9]" : ""}
              />
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
          onClick={() => {
            setMessage("");
            setDeleteTarget(null);
          }}
        >
          <section
            className="w-full max-w-90 rounded-[8px] bg-white px-5 py-5 text-black"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center">
              <strong
                id="delete-title"
                className="w-full text-center text-[16px]"
              >
                방명록 삭제
              </strong>
              <button
                type="button"
                aria-label="닫기"
                className="flex size-8 items-center justify-center rounded-full text-[#606060]"
                onClick={() => {
                  setMessage("");
                  setDeleteTarget(null);
                }}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-6 [&>label]:mt-0">
              <FormInput
                title="비밀번호"
                hint="작성 시 비밀번호 또는 관리자 비밀번호"
                value={deletePassword}
                inputType="password"
                required
                onChange={setDeletePassword}
              />
              {message && (
                <p className="mt-3 text-[12px] text-red-500">{message}</p>
              )}
            </div>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                className="flex h-12 flex-1 items-center justify-center rounded-[8px] border-[0.5px] border-[#C9C9C9] text-[14px]"
                onClick={() => {
                  setMessage("");
                  setDeleteTarget(null);
                }}
              >
                취소
              </button>
              <button
                type="button"
                className="flex h-12 flex-1 items-center justify-center rounded-[8px] bg-black text-[14px] text-white disabled:bg-[#C9C9C9]"
                disabled={deletePassword.trim().length === 0}
                onClick={() => {
                  void deleteGuestBook();
                }}
              >
                삭제
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
