"use client";

import { useState } from "react";
import WorkoutCard from "./WorkoutCard";
import type { Workout } from "../types/workout";

interface WorkoutLibraryProps {
  workouts: Workout[];
}

type SortOption = "duration" | "calories" | "rating";

export default function WorkoutLibrary({
  workouts,
}: WorkoutLibraryProps) {
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const sortedWorkouts = [...workouts].sort((a, b) => {
    switch (sortBy) {
      case "duration":
        return a.duration - b.duration;

      case "calories":
        return a.caloriesBurned - b.caloriesBurned;

      case "rating":
        return b.rating - a.rating;

      default:
        return 0;
    }
  });

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
    >
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            The Library
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-foreground">
            Twelve lifts covering every major muscle group.
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-workouts"
            className="text-sm font-semibold uppercase tracking-wide text-muted"
          >
            Sort By
          </label>

          <select
            id="sort-workouts"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground outline-none transition-colors focus:border-accent"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}