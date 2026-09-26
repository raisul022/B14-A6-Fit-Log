import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
          404 — Page Not Found
        </p>

        <h1 className="mt-4 text-5xl font-black uppercase tracking-tight text-foreground sm:text-7xl">
          Wrong Route.
        </h1>

        <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}