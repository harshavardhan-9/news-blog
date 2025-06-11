# News Dashboard

A responsive dashboard application for managing news articles and author payouts. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔐 User Authentication with Clerk
- 📰 News API Integration
- 📊 Interactive Analytics
- 💰 Payout Management
- 📱 Responsive Design
- 🌓 Dark Mode Support
- 📤 Export to PDF/CSV
- 🔍 Advanced Filtering

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **State Management**: Zustand
- **UI Components**: Radix UI
- **Charts**: Chart.js
- **Forms**: React Hook Form
- **Data Fetching**: Axios
- **Date Handling**: date-fns
- **Export**: jsPDF, react-csv

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/harshavardhan-9/news-blog
   cd newsblog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   └── (main)/
│       ├── dashboard/
│       ├── news/
│       └── settings/
├── components/
│   ├── ui/
│   ├── navbar.tsx
│   └── sidebar.tsx
├── hooks/
│   └── use-toast.ts
├── lib/
│   └── utils.ts
└── types/
    └── env.d.ts
```

## Features in Detail

### Authentication
- Secure authentication using Clerk
- Protected routes and middleware
- Role-based access control

### Dashboard
- Overview of total articles
- Visual analytics with Chart.js
- Recent articles feed

### News Management
- Integration with News API
- Advanced filtering options
- Search functionality
- Responsive article cards

### Payout System
- Configurable payout rates
- Automatic calculations
- Export functionality (PDF/CSV)
- Google Sheets integration (coming soon)

### Settings
- Theme customization
- Payout rate management
- Export options

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
