import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import WorkoutCard from "./components/WorkoutCard";
import { getWorkouts } from "./lib/api";

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
              Explore focused workouts, build your daily plan, and keep every
              session organized with FitLog.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#library"
                className="rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
              >
                Browse Workouts
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
      <section
        id="library"
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            The Library
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-foreground">
            {workouts.length} Workouts
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </main>
  );
}