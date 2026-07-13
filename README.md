# Employee Management System (EMS) — MERN Stack

A full-stack Employee Management System:
- **Admin** logs in, adds employees, and assigns them tasks.
- **Employees** log in, see their tasks, accept new ones, and mark them completed or failed.

Built with **MongoDB, Express, React, Node.js** — the backend follows the same
patterns (Express + Mongoose + JWT-in-cookie + bcrypt) as the sample Spotify-clone
backend this project was modeled after.

```
project/
├── backend/     ← Express + MongoDB API
└── frontend/    ← React + Vite + Tailwind app
```

## 1. Backend setup

```bash
cd backend
npm install 
cp .env.example .env
```

Open `.env` and fill in:
- `MONGO_URI` — a MongoDB connection string. Easiest option: create a free cluster at
  https://www.mongodb.com/cloud/atlas and copy its connection string.
- `JWT_SECRET` — any long random string (e.g. mash your keyboard).
- Leave `PORT` and `CLIENT_URL` as-is unless you change ports.

Create your first login (an admin account):

```bash
npm run seed
```

This prints an email/password you can log in with — by default `admin@me.com` / `123`.

Start the server:

```bash
npm run dev
```

You should see `Database Connected Successfully` and `EMS backend server running on http://localhost:3000`.

## 2. Frontend setup

In a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## 3. Using the app

1. Log in with the admin account from the seed step.
2. Use **Add Employee** to create one or more employee accounts.
3. Use **Create Task** to assign a task to an employee.
4. Log out, then log back in with an employee's email/password to see their dashboard.
5. As an employee: accept a new task, then mark it completed or failed.
6. Log back in as admin to see the updated task counts.

## 4. Learning React?

See **`React-Beginners-Guide.pdf`** (in this same folder) — it walks through how React
works, how this exact project is built, and how the frontend talks to the backend
you just set up, written for someone learning React for the first time.
