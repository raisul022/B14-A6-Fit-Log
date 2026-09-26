"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFitLog } from "../context/FitLogContext";

const navLinks = [
  { label: "Workout", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { plan, saved } = useFitLog();

  const planCount = plan.length;
  const savedCount = saved.length;

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="flex min-h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="FitLog home"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/assets/logo.png"
              alt="FitLog"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />

            <span className="text-lg font-black tracking-[-0.04em] text-foreground">
              FITLOG
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-surface text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/my-plan"
              className="rounded-full bg-accent px-3.5 py-2 text-sm font-bold text-black transition-transform hover:scale-105 sm:px-4"
            >
              Plan <span className="ml-1">{planCount}</span>
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full border border-border px-3.5 py-2 text-sm font-bold text-foreground transition-colors hover:bg-surface sm:px-4"
            >
              Saved <span className="ml-1">{savedCount}</span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface md:hidden"
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
            >
              <span className="sr-only">
                {menuOpen ? "Close menu" : "Open menu"}
              </span>

              <span className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-4 bg-current transition-transform ${
                    menuOpen ? "translate-y-1" : ""
                  }`}
                />

                <span
                  className={`block h-0.5 w-4 bg-current transition-opacity ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />

                <span
                  className={`block h-0.5 w-4 bg-current transition-transform ${
                    menuOpen ? "-translate-y-1" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-surface text-foreground"
                        : "text-muted hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}