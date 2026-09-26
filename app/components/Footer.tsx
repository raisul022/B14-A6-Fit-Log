export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12 text-center sm:px-8 lg:px-12">
        <p className="text-2xl font-black uppercase tracking-[0.18em] text-foreground">
          FitLog
        </p>

        <p className="mt-4 text-sm leading-6 text-muted">
          © 2026 FitLog — Workout Library.
          <br />
          Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}