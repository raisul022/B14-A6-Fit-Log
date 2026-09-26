import Image from "next/image";
import Link from "next/link";
import type { Workout } from "../types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-transform duration-300 hover:-translate-y-1">
      {/* Workout Image */}
      <Link href={`/workouts/${workout.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-black">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5">
        {/* Muscle Group Tags */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscleGroup) => (
            <span
              key={muscleGroup}
              className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted"
            >
              {muscleGroup}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <Link href={`/workouts/${workout.id}`}>
          <h3 className="mt-4 text-xl font-bold text-foreground transition-colors group-hover:text-accent">
            {workout.name}
          </h3>
        </Link>

        {/* Equipment */}
        <p className="mt-2 text-sm text-muted">
          {workout.equipment}
        </p>

        {/* Workout Stats */}
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
          <span>{workout.duration} min</span>
          <span>{workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>

        {/* Details Link */}
        <Link
          href={`/workouts/${workout.id}`}
          className="mt-5 inline-flex text-sm font-bold uppercase tracking-wide text-accent transition-opacity hover:opacity-80"
        >
          View Details →
        </Link>
      </div>
    </article>
  );
}