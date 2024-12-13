"use client";

import { NavUser } from "./nav-user";
import { SidebarTrigger } from "./ui/sidebar";
import { NotificationsBell } from "./nav-notificationbell";
import { SearchBar } from "./nav-search";
import { ModeToggle } from "./mode-toggle";
import { Breadcrumb } from "./breadcrumb";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <SidebarTrigger />
        <Breadcrumb />
        <div className="flex items-center space-x-4 sm:space-x-6">
          <SearchBar />
          <NotificationsBell />
          <ModeToggle />
          <NavUser
            user={{
              name: "Suna Yıldız",
              email: "",
              avatar: "",
            }}
          />
        </div>
      </div>
    </header>
  );
}
