"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
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

function getStoredPlan(): Workout[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedPlan = localStorage.getItem(PLAN_STORAGE_KEY);

    if (!storedPlan) {
      return [];
    }

    const parsedPlan: unknown = JSON.parse(storedPlan);

    return Array.isArray(parsedPlan)
      ? (parsedPlan as Workout[])
      : [];
  } catch {
    return [];
  }
}

function getStoredSaved(): Workout[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedSaved = localStorage.getItem(SAVED_STORAGE_KEY);

    if (!storedSaved) {
      return [];
    }

    const parsedSaved: unknown = JSON.parse(storedSaved);

    return Array.isArray(parsedSaved)
      ? (parsedSaved as Workout[])
      : [];
  } catch {
    return [];
  }
}

function getStoredCompleted(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedCompleted = localStorage.getItem(
      COMPLETED_STORAGE_KEY
    );

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
  const [plan, setPlan] = useState<Workout[]>(getStoredPlan);
  const [saved, setSaved] = useState<Workout[]>(getStoredSaved);
  const [completed, setCompleted] =
    useState<number[]>(getStoredCompleted);

  // Keep localStorage synchronized with the current plan.
  useEffect(() => {
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
  }, [plan]);

  // Keep localStorage synchronized with saved workouts.
  useEffect(() => {
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  // Keep localStorage synchronized with completed workouts.
  useEffect(() => {
    localStorage.setItem(
      COMPLETED_STORAGE_KEY,
      JSON.stringify(completed)
    );
  }, [completed]);

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
    (id: number) => {
      return completed.includes(id);
    },
    [completed]
  );

  const isInPlan = useCallback(
    (id: number) => {
      return plan.some((workout) => workout.id === id);
    },
    [plan]
  );

  const isSaved = useCallback(
    (id: number) => {
      return saved.some((workout) => workout.id === id);
    },
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
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
}