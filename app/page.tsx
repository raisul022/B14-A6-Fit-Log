export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-12">
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
            <button className="rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105">
              Browse Workouts
            </button>

            <button className="rounded-full border border-border px-6 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-surface">
              My Plan
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}