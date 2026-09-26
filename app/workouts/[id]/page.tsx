import Image from "next/image";
import Link from "next/link";
import { getWorkoutById } from "../../lib/api";
import WorkoutActions from "../../components/WorkoutActions";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  return (
    <main className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="mx-auto max-w-7xl px-6 pt-8 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-wide text-muted transition-colors hover:text-accent"
        >
          ← Back to workouts
        </Link>
      </div>

      {/* Workout Details */}
      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscleGroup) => (
                <span
                  key={muscleGroup}
                  className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted"
                >
                  {muscleGroup}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="mt-5 text-4xl font-black uppercase leading-none tracking-tight text-foreground sm:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-6 text-base leading-7 text-muted">
              {workout.description}
            </p>

            {/* Specs */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Equipment
                </p>
                <p className="mt-2 text-sm font-bold text-foreground">
                  {workout.equipment}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Difficulty
                </p>
                <p className="mt-2 text-sm font-bold text-foreground">
                  {workout.difficulty}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Sets
                </p>
                <p className="mt-2 text-sm font-bold text-foreground">
                  {workout.sets}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Reps
                </p>
                <p className="mt-2 text-sm font-bold text-foreground">
                  {workout.reps}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Duration
                </p>
                <p className="mt-2 text-sm font-bold text-foreground">
                  {workout.duration} min
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Calories
                </p>
                <p className="mt-2 text-sm font-bold text-foreground">
                  {workout.caloriesBurned} kcal
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-6 flex items-center gap-2">
              <span className="text-accent">★</span>
              <span className="font-bold text-foreground">
                {workout.rating}
              </span>
              <span className="text-sm text-muted">Rating</span>
            </div>

            {/* Actions */}
            <WorkoutActions workout={workout} />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16 border-t border-border pt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            How to perform
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-foreground">
            Instructions
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {workout.instructions.map((instruction, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <span className="text-sm font-black text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="mt-4 text-base leading-7 text-muted">
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}