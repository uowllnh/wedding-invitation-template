"use client";

import { useEffect } from "react";

export default function CopyGuard() {
  useEffect(() => {
    const prevent = (event: Event) => {
      event.preventDefault();
    };

    const preventShortcut = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isModifier = event.ctrlKey || event.metaKey;

      if (isModifier && ["c", "s", "p", "u"].includes(key)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", prevent);
    document.addEventListener("copy", prevent);
    document.addEventListener("cut", prevent);
    document.addEventListener("dragstart", prevent);
    document.addEventListener("keydown", preventShortcut);

    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("copy", prevent);
      document.removeEventListener("cut", prevent);
      document.removeEventListener("dragstart", prevent);
      document.removeEventListener("keydown", preventShortcut);
    };
  }, []);

  return null;
}
