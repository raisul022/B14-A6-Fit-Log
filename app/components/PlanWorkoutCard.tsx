import Image from "next/image";
import Link from "next/link";
import type { Workout } from "../types/workout";

interface PlanWorkoutCardProps {
  workout: Workout;
}

export default function PlanWorkoutCard({
  workout,
}: PlanWorkoutCardProps) {
  return (
    <article className="group overflow-hidden border border-border bg-surface">
      {/* Workout Image */}
      <Link
        href={`/workouts/${workout.id}`}
        className="block overflow-hidden"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-black">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-6">
        {/* Title + Equipment */}
        <div>
          <Link href={`/workouts/${workout.id}`}>
            <h2 className="text-2xl font-black uppercase leading-tight tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
              {workout.name}
            </h2>
          </Link>

          <p className="mt-2 text-sm uppercase tracking-wide text-muted">
            {workout.equipment}
          </p>
        </div>

        {/* Workout Stats */}
        <div className="mt-6 grid grid-cols-3 border-y border-border">
          <div className="border-r border-border py-4 pr-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
              Duration
            </p>

            <p className="mt-2 text-sm font-bold text-foreground">
              {workout.duration} min
            </p>
          </div>

          <div className="border-r border-border px-3 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
              Calories
            </p>

            <p className="mt-2 text-sm font-bold text-foreground">
              {workout.caloriesBurned} kcal
            </p>
          </div>

          <div className="py-4 pl-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
              Rating
            </p>

            <p className="mt-2 text-sm font-bold text-foreground">
              <span className="text-accent">★</span>{" "}
              {workout.rating}
            </p>
          </div>
        </div>

        {/* View Details */}
        <div className="mt-6">
          <Link
            href={`/workouts/${workout.id}`}
            className="inline-flex items-center text-xs font-black uppercase tracking-[0.15em] text-accent transition-opacity hover:opacity-70"
          >
            View Details
            <span className="ml-2 text-base">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}