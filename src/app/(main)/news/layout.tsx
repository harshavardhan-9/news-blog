import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News - Dashboard",
  description: "Advanced news filtering and search functionality.",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-1">{children}</div>;
} 