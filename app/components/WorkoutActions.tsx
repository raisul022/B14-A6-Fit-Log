"use client";

import { useCallback, useState } from "react";
import type { Workout } from "../types/workout";
import { useFitLog } from "../context/FitLogContext";
import Toast from "./Toast";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = useFitLog();

  const [message, setMessage] = useState("");

  const closeToast = useCallback(() => {
    setMessage("");
  }, []);

  const handleAddToPlan = () => {
    const added = addToPlan(workout);

    if (added) {
      setMessage("Added to today's plan.");
    } else if (isInPlan(workout.id)) {
      setMessage("Already in today's plan.");
    } else {
      setMessage("Your plan can contain up to 5 lifts.");
    }
  };

  const handleSave = () => {
    const saved = saveWorkout(workout);

    if (saved) {
      setMessage("Saved for later.");
    } else if (isSaved(workout.id)) {
      setMessage("Already saved.");
    }
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAddToPlan}
            disabled={isInPlan(workout.id)}
            className="rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {isInPlan(workout.id)
              ? "Added to plan"
              : "Add to today's plan"}
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaved(workout.id)}
            className="rounded-full border border-border px-6 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaved(workout.id) ? "Saved" : "Save for later"}
          </button>
        </div>
      </div>

      {message && (
        <Toast
          message={message}
          onClose={closeToast}
        />
      )}
    </>
  );
}