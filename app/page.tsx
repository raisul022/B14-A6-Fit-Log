import Link from "next/link";
import Navbar from "./components/Navbar";
import { getWorkouts } from "./lib/api";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </p>

          <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-8xl">
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
      </section>

      {/* Workout Library - API Test */}
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
            <div
              key={workout.id}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <h3 className="font-bold text-foreground">
                {workout.name}
              </h3>

              <p className="mt-2 text-sm text-muted">
                {workout.equipment}
              </p>

              <p className="mt-4 text-sm text-muted">
                {workout.duration} min · {workout.caloriesBurned} kcal
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}