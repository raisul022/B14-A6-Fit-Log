"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import PlanWorkoutCard from "../components/PlanWorkoutCard";
import { useFitLog } from "../context/FitLogContext";

type PlanTab = "today" | "saved";

export default function MyPlanPage() {
  const { plan, saved } = useFitLog();
  const [activeTab, setActiveTab] = useState<PlanTab>("today");

  const workouts = activeTab === "today" ? plan : saved;

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        {/* Page Header */}
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Training Log
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase leading-none tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
            My Plan
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          <div className="bg-surface px-6 py-7 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Exercises
            </p>

            <p className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              {plan.length}
            </p>
          </div>

          <div className="bg-surface px-6 py-7 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Minutes
            </p>

            <p className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              {totalMinutes}
            </p>
          </div>

          <div className="bg-surface px-6 py-7 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Calories
            </p>

            <p className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-14 flex items-center gap-8 border-b border-border">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={`relative pb-4 text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
              activeTab === "today"
                ? "text-accent"
                : "text-muted hover:text-foreground"
            }`}
          >
            Today&apos;s Plan

            {activeTab === "today" && (
              <span className="absolute bottom-[-1px] left-0 h-0.5 w-full bg-accent" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`relative pb-4 text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
              activeTab === "saved"
                ? "text-accent"
                : "text-muted hover:text-foreground"
            }`}
          >
            Saved

            {activeTab === "saved" && (
              <span className="absolute bottom-[-1px] left-0 h-0.5 w-full bg-accent" />
            )}
          </button>
        </div>

        {/* Workout List */}
        <div className="mt-8">
          {workouts.length === 0 ? (
            <div className="border border-dashed border-border px-6 py-20 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                Nothing Here Yet
              </p>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/#library"
                className="mt-7 inline-flex rounded-full bg-accent px-6 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition-transform hover:scale-105"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {workouts.map((workout) => (
                <PlanWorkoutCard
                  key={workout.id}
                  workout={workout}
                  isSavedTab={activeTab === "saved"}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}