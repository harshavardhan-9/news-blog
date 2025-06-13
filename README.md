# News Dashboard

A responsive news dashboard built with **React**, **TypeScript**, **Vite**, and **ShadCN UI**.

## 🚀 Features

- ✅ **Authentication** with email & password
- 🧑‍💻 Role-based UI (Admin/User)
- 📰 View articles by route (`/news`, `/article/:id`)
- 🎨 Modern UI using [ShadCN UI](https://ui.shadcn.com)
- 🔄 API simulation with React Query
- 🌐 Routing with React Router
- 💬 Toast notifications using `sonner` and `toaster`
- 🛠 Built with Vite + TypeScript

## 🧩 Folder Structure

src/
├── components/
│ ├── LoginForm.tsx
│ ├── Dashboard.tsx
│ └── ui/...
├── contexts/
│ └── AuthContext.tsx
├── pages/
│ ├── Index.tsx
│ ├── About.tsx
│ ├── Contact.tsx
│ ├── Article.tsx
│ └── NotFound.tsx
├── hooks/
│ └── use-toast.ts
├── App.tsx
└── main.tsx

🔐 Login Info
Admin Login:
Email: admin@news.com
Password: any

User Login:
Use any other email and password.

📦 Tech Stack

React + TypeScript
Vite
ShadCN UI (Tailwind-based)
React Query
React Router
Toasts: sonner & toaster