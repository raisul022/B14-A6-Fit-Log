import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import WorkoutLibrary from "./components/WorkoutLibrary";
import { getWorkouts } from "./lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Hero Content */}
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Workout Library
            </p>

            <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
              Train with intent.
              <br />
              Log every set.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock
              it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#library"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
              >
                Browse Workouts
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/my-plan"
                className="rounded-full border border-border px-6 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-surface"
              >
                My Plan
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface">
            <Image
              src="/assets/banner.png"
              alt="FitLog workout training"
              width={1200}
              height={800}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Workout Library */}
      <WorkoutLibrary workouts={workouts} />
    </main>
  );
}