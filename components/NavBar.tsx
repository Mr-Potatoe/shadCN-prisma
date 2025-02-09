"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

const navItems = {
  ADMIN: [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/users", label: "Manage Users" },
    { href: "/admin/reports", label: "Reports" },
  ],
  STUDENT: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/courses", label: "Courses" },
    { href: "/profile", label: "Profile" },
  ],
};
export default function NavBar() {
  const { setTheme } = useTheme();
  const [role, setRole] = useState<"ADMIN" | "STUDENT" | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role") as "ADMIN" | "STUDENT" | null;
    setRole(storedRole);

    const handleStorageChange = () => {
      setRole(localStorage.getItem("role") as "ADMIN" | "STUDENT" | null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const renderNavItems = (isMobile = false) => {
    if (!role || !navItems[role]) return null;

    return (
      <>
        {navItems[role].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-gray-900 dark:text-white hover:text-blue-500 ${
              isMobile ? "" : "hidden md:inline-block"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <LogoutButton />
      </>
    );
  };
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-6">
            <Link href="/" className="text-2xl font-semibold text-gray-900 dark:text-white">
              MyApp
            </Link>
            <div className="mt-6 flex flex-col space-y-4">
              {renderNavItems(true)}
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="text-2xl font-semibold text-gray-900 dark:text-white hidden md:block">
          MyApp
        </Link>

        <div className="hidden md:flex space-x-6">
          {renderNavItems()}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

