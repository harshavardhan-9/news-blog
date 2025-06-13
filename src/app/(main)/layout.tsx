"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "News", href: "/news" },
  { name: "Admin", href: "/admin", adminOnly: true },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/dashboard" className="text-xl font-bold">
                  News Dashboard
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) =>
                  !item.adminOnly || (item.adminOnly && isAdmin) ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                        pathname === item.href
                          ? "border-primary text-foreground"
                          : "border-transparent text-muted-foreground hover:border-muted-foreground/50"
                      )}
                    >
                      {item.name}
                    </Link>
                  ) : null
                )}
              </div>
            </div>
            <div className="flex items-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
} 