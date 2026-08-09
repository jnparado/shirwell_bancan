"use client";

import { X } from "lucide-react";

type AuthCloseButtonProps = {
  onClick: () => void;
  /** e.g. "Close sign in" / "Close sign up" */
  label: string;
};

export function AuthCloseButton({ onClick, label }: AuthCloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#5f6368] transition hover:bg-[#f1f3f4] hover:text-[#202124]"
      aria-label={label}
      title={label}
    >
      <X className="h-5 w-5" aria-hidden />
    </button>
  );
}
