"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onClose();
    }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground shadow-2xl"
    >
      <span className="mr-2 text-accent">✓</span>
      {message}
    </div>
  );
}