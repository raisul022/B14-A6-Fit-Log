# 💪 FitLog — Workout Library & Planning Website

FitLog is a modern workout library and planning website built with **Next.js and React**. It allows users to explore workouts, view detailed exercise information, add workouts to today's plan, save workouts for later, and track completed exercises.

The application is designed with a dark, focused gym aesthetic and provides a responsive experience across mobile, tablet, and desktop devices.

---

## 🚀 Live Project

Live Link:
https://b14-a6-fit-log-bay.vercel.app

GitHub Repository:
https://github.com/raisul022/B14-A6-Fit-Log


---

## ✨ Key Features

### 1. Workout Library

* Fetches workout data from the FitLog API.
* Displays workout cards with:

  * Workout image
  * Muscle group/category tags
  * Workout name
  * Equipment
  * Duration
  * Calories burned
  * Rating
* Responsive workout grid for different screen sizes.

### 2. Workout Details

Each workout has a dedicated dynamic details page.

The details page includes:

* Large workout image
* Workout name
* Description
* Muscle group tags
* Equipment
* Difficulty
* Sets and reps
* Duration
* Calories
* Rating
* Step-by-step instructions
* Add to Today's Plan action
* Save for Later action

### 3. Today's Plan

Users can add workouts to their daily plan.

The My Plan page provides:

* Today's Plan tab
* Saved tab
* Exercise count
* Total workout minutes
* Total calories
* View Details action
* Mark as Done action
* Remove workout action
* Empty state when no workouts are available

### 4. Saved Workouts

Users can save workouts for later.

Saved workouts can be:

* Viewed from the Saved tab
* Opened through the workout details page
* Removed from the saved list

### 5. Toast Notifications

The application provides feedback after important actions.

Examples:

* Added to today's plan
* Saved for later
* Workout marked as done
* Workout removed from plan
* Workout removed from saved list

### 6. Sort Workouts

The workout library includes a **Sort By** dropdown.

Available sorting options:

* Default
* Name
* Duration
* Calories
* Rating

The workout list updates immediately when the sorting option changes.

### 7. LocalStorage Persistence

Today's Plan, Saved Workouts, and completed workout information are persisted using browser `localStorage`.

This allows user selections to remain available after refreshing the page.

### 8. Responsive Design

The website is designed for:

* Mobile
* Tablet
* Desktop

The navigation, hero section, workout cards, plan page, and other sections adapt to different screen sizes.

### 9. Loading and Error Handling

The application includes:

* Loading animation while workout data is loading
* Custom 404 page for invalid routes
* API error handling
* Empty states for plan and saved workouts

---

## 🛠️ Technologies Used

* Next.js
* React
* TypeScript
* Tailwind CSS
* Next.js App Router
* React Context API
* Browser localStorage
* REST API

---

## 🔌 API

FitLog uses the provided FitLog API.

### All Workouts

```text
https://api.abcz.workers.dev/api/fitlog
```

---

## 📁 Main Project Structure

```text
B14-A6-Fit-Log/
│
├── app/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── PlanWorkoutCard.tsx
│   │   ├── Toast.tsx
│   │   ├── WorkoutActions.tsx
│   │   ├── WorkoutCard.tsx
│   │   └── WorkoutLibrary.tsx
│   │
│   ├── context/
│   │   └── FitLogContext.tsx
│   │
│   ├── lib/
│   │   └── api.ts
│   │
│   ├── my-plan/
│   │   └── page.tsx
│   │
│   ├── workouts/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── types/
│   │   └── workout.ts
│   │
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── public/
│   └── assets/
│
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🧠 State Management

FitLog uses **React Context API** for application-level workout state.

The context manages:

* Today's Plan
* Saved Workouts
* Completed Workouts
* Adding workouts
* Removing workouts
* Saving workouts
* Marking workouts as completed
* `localStorage` persistence

This allows different pages and components to access the same workout state.

---

## 📱 Main Routes

| Route            | Purpose                         |
| ---------------- | ------------------------------- |
| `/`              | Workout Library / Home          |
| `/workouts/[id]` | Dynamic Workout Details         |
| `/my-plan`       | Today's Plan and Saved Workouts |

---

## ⚙️ Installation & Setup

### Clone the repository

```bash
git clone https://github.com/raisul022/B14-A6-Fit-Log.git
```

### Move into the project directory

```bash
cd B14-A6-Fit-Log
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔍 Code Quality

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

---

## 🌐 Deployment

FitLog can be deployed using platforms such as:

* Vercel
* Netlify
* Cloudflare Pages

Before deployment, test the project with:

```bash
npm run lint
npm run build
```

The deployed application should also be tested for:

* Home page loading
* Workout details
* Add to Plan
* Save for Later
* My Plan
* Sorting
* Toast notifications
* Page refresh
* Invalid routes
* Responsive layout

---

## 📌 Project Requirements Covered

* Responsive design
* Workout API integration
* Workout library
* Dynamic workout details
* Today's Plan
* Saved workouts
* Navbar counters
* Toast notifications
* Loading state
* Custom 404 page
* Sort dropdown
* Mark as Done
* Remove workout
* localStorage persistence
* Responsive UI
* GitHub repository
* README documentation

---

## 👨‍💻 Author

**Raisul Islam Rifat**

Live Link:
https://b14-a6-fit-log-bay.vercel.app

GitHub Repository:
https://github.com/raisul022/B14-A6-Fit-Log
