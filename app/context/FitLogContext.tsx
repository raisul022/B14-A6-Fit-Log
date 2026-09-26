"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Workout } from "../types/workout";

interface FitLogContextValue {
  plan: Workout[];
  saved: Workout[];
  completed: number[];

  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;

  saveWorkout: (workout: Workout) => boolean;
  removeSaved: (id: number) => void;

  markAsDone: (id: number) => void;
  isCompleted: (id: number) => boolean;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const FitLogContext = createContext<FitLogContextValue | undefined>(
  undefined
);

interface FitLogProviderProps {
  children: ReactNode;
}

const PLAN_STORAGE_KEY = "fitlog-plan";
const SAVED_STORAGE_KEY = "fitlog-saved";
const COMPLETED_STORAGE_KEY = "fitlog-completed";

function readStoredPlan(): Workout[] {
  try {
    const storedPlan = localStorage.getItem(PLAN_STORAGE_KEY);

    if (!storedPlan) {
      return [];
    }

    const parsedPlan: unknown = JSON.parse(storedPlan);

    return Array.isArray(parsedPlan) ? (parsedPlan as Workout[]) : [];
  } catch {
    return [];
  }
}

function readStoredSaved(): Workout[] {
  try {
    const storedSaved = localStorage.getItem(SAVED_STORAGE_KEY);

    if (!storedSaved) {
      return [];
    }

    const parsedSaved: unknown = JSON.parse(storedSaved);

    return Array.isArray(parsedSaved) ? (parsedSaved as Workout[]) : [];
  } catch {
    return [];
  }
}

function readStoredCompleted(): number[] {
  try {
    const storedCompleted = localStorage.getItem(COMPLETED_STORAGE_KEY);

    if (!storedCompleted) {
      return [];
    }

    const parsedCompleted: unknown = JSON.parse(storedCompleted);

    if (!Array.isArray(parsedCompleted)) {
      return [];
    }

    return parsedCompleted.filter(
      (id): id is number => typeof id === "number"
    );
  } catch {
    return [];
  }
}

export function FitLogProvider({ children }: FitLogProviderProps) {
  // Keep the first server and client render identical.
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load localStorage after the initial render.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPlan(readStoredPlan());
      setSaved(readStoredSaved());
      setCompleted(readStoredCompleted());
      setHydrated(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  // Save plan after localStorage has been loaded.
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  // Save saved workouts after localStorage has been loaded.
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  // Save completed workouts after localStorage has been loaded.
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(
      COMPLETED_STORAGE_KEY,
      JSON.stringify(completed)
    );
  }, [completed, hydrated]);

  const addToPlan = useCallback((workout: Workout) => {
    let canAdd = true;

    setPlan((currentPlan) => {
      if (currentPlan.some((item) => item.id === workout.id)) {
        canAdd = false;
        return currentPlan;
      }

      if (currentPlan.length >= 5) {
        canAdd = false;
        return currentPlan;
      }

      return [...currentPlan, workout];
    });

    return canAdd;
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );

    setCompleted((currentCompleted) =>
      currentCompleted.filter((workoutId) => workoutId !== id)
    );
  }, []);

  const saveWorkout = useCallback((workout: Workout) => {
    let canSave = true;

    setSaved((currentSaved) => {
      if (currentSaved.some((item) => item.id === workout.id)) {
        canSave = false;
        return currentSaved;
      }

      return [...currentSaved, workout];
    });

    return canSave;
  }, []);

  const removeSaved = useCallback((id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );
  }, []);

  const markAsDone = useCallback((id: number) => {
    setCompleted((currentCompleted) => {
      if (currentCompleted.includes(id)) {
        return currentCompleted;
      }

      return [...currentCompleted, id];
    });
  }, []);

  const isCompleted = useCallback(
    (id: number) => completed.includes(id),
    [completed]
  );

  const isInPlan = useCallback(
    (id: number) => plan.some((workout) => workout.id === id),
    [plan]
  );

  const isSaved = useCallback(
    (id: number) => saved.some((workout) => workout.id === id),
    [saved]
  );

  const value = useMemo(
    () => ({
      plan,
      saved,
      completed,
      addToPlan,
      removeFromPlan,
      saveWorkout,
      removeSaved,
      markAsDone,
      isCompleted,
      isInPlan,
      isSaved,
    }),
    [
      plan,
      saved,
      completed,
      addToPlan,
      removeFromPlan,
      saveWorkout,
      removeSaved,
      markAsDone,
      isCompleted,
      isInPlan,
      isSaved,
    ]
  );

  return (
    <FitLogContext.Provider value={value}>
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
}