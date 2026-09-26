import type { Workout } from "../types/workout";

const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

export async function getWorkouts(): Promise<Workout[]> {
  for (const apiUrl of API_URLS) {
    try {
      const response = await fetch(apiUrl, {
        cache: "no-store",
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        continue;
      }

      return data as Workout[];
    } catch {
      continue;
    }
  }

  return [];
}

export async function getWorkoutById(id: string): Promise<Workout> {
  for (const apiUrl of API_URLS) {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        continue;
      }

      return (await response.json()) as Workout;
    } catch {
      continue;
    }
  }

  throw new Error("Workout not found");
}