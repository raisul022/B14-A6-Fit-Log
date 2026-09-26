"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Workout } from "../types/workout";
import { useFitLog } from "../context/FitLogContext";

interface PlanWorkoutCardProps {
  workout: Workout;
  isSavedTab?: boolean;
}

export default function PlanWorkoutCard({
  workout,
  isSavedTab = false,
}: PlanWorkoutCardProps) {
  const {
    removeFromPlan,
    removeSaved,
    markAsDone,
    isCompleted,
  } = useFitLog();

  const [message, setMessage] = useState("");

  const completed = isCompleted(workout.id);

  const handleMarkAsDone = () => {
    if (completed) {
      return;
    }

    markAsDone(workout.id);
    setMessage("Workout marked as done.");
  };

  const handleRemove = () => {
    if (isSavedTab) {
      removeSaved(workout.id);
      setMessage("Workout removed from saved.");
      return;
    }

    removeFromPlan(workout.id);
    setMessage("Workout removed from your plan.");
  };

  return (
    <article
      className={`group overflow-hidden border border-border bg-surface transition-opacity ${
        completed ? "opacity-75" : ""
      }`}
    >
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
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              completed ? "grayscale" : ""
            }`}
          />

          {completed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-accent px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-black">
                ✓ Completed
              </span>
            </div>
          )}
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

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!isSavedTab && (
            <button
              type="button"
              onClick={handleMarkAsDone}
              disabled={completed}
              className="rounded-full bg-accent px-5 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-black transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {completed ? "✓ Completed" : "Mark as Done"}
            </button>
          )}

          <Link
            href={`/workouts/${workout.id}`}
            className="rounded-full border border-border px-5 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-background"
          >
            View Details
          </Link>

          <button
            type="button"
            onClick={handleRemove}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-border text-lg font-medium text-muted transition-colors hover:border-red-500 hover:text-red-400"
            aria-label={`Remove ${workout.name}`}
            title="Remove"
          >
            ×
          </button>
        </div>

        {/* Toast / Action Message */}
        {message && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
            {message}
          </p>
        )}
      </div>
    </article>
  );
}