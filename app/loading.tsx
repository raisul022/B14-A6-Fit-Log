export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6">
        <div className="flex flex-col items-center gap-5">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted">
            Loading workouts...
          </p>
        </div>
      </div>
    </main>
  );
}