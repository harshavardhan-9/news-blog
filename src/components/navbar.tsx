"use client"

import { UserButton } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Moon, Sun } from "lucide-react"
import Sidebar from "@/components/sidebar"

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex items-center p-4">
      <Sheet>
        <SheetTrigger>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-gray-900">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <div className="flex w-full justify-end items-center gap-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </Button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
} 