"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Bell, ChevronDown, Moon, Search, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavUser } from "./nav-user";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { NotificationsBell } from "./nav-notificationbell";
import { SearchBar } from "./nav-search";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <SearchBar />
          <SidebarTrigger />
          <NotificationsBell />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="mr-6"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <div>
            <NavUser
              user={{
                name: "Mr Joestar",
                email: "sah@gmail.com",
                avatar: "/path/to/avatar.jpg",
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
