# 🚀 SyncUI Dashboard

A real-time dashboard built with React that simulates periodic data synchronization using a public API. The application automatically refreshes data every fixed interval and displays a live countdown timer.

## 🔗 Live Demo
👉 https://sync-ui.vercel.app/

## 📂 GitHub Repository
👉 https://github.com/adityadev000/SyncUi

---

## ✨ Features

- 🔄 Real-time data fetching from public API
- ⏳ Live countdown timer (auto reset after each fetch)
- 📊 Dynamic progress bar synced with timer
- 👥 Displays multiple users (API data)
- ⚛️ Efficient state management using React hooks
- 🧹 Proper cleanup of intervals to prevent memory leaks
- 🎨 Clean and responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

- Frontend: React (Vite)
- Styling:Tailwind CSS
- API: https://randomuser.me/
- Deployment: Vercel

---

## ⚙️ How It Works

- The app fetches user data from the API.
- A countdown timer starts (default: 60 seconds).
- The progress bar decreases smoothly with time.
- When the timer reaches 0:
  - Data is automatically re-fetched
  - Timer resets
- `useEffect` + `setInterval` are used to simulate real-time updates.
- Cleanup function ensures no memory leaks.

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=https://randomuser.me/api/?results=5
VITE_RESET_TIME=60
