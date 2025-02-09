"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default function NavBar() {
  const { setTheme } = useTheme();
  const [role, setRole] = useState<string | null>(null);

  // Fetch role from localStorage properly
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    const handleStorageChange = () => {
      setRole(localStorage.getItem("role")); // Update when role changes
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Update role instantly on login/logout
  useEffect(() => {
    const interval = setInterval(() => {
      setRole(localStorage.getItem("role"));
    }, 500); // Check every 500ms (fixes sync issues)

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold text-gray-900 dark:text-white">
          MyApp
        </Link>

        {/* Conditional Navigation */}
        {role === "ADMIN" ? (
          <div className="hidden md:flex space-x-6">
            <Link href="/admin/dashboard" className="text-gray-900 dark:text-white hover:text-blue-500">
              Dashboard
            </Link>
            <Link href="/admin/users" className="text-gray-900 dark:text-white hover:text-blue-500">
              Manage Users
            </Link>
            <Link href="/admin/reports" className="text-gray-900 dark:text-white hover:text-blue-500">
              Reports
            </Link>
            <LogoutButton />
          </div>
        ) : role === "STUDENT" ? (
          <div className="hidden md:flex space-x-6">
            <Link href="/dashboard" className="text-gray-900 dark:text-white hover:text-blue-500">
              Dashboard
            </Link>
            <Link href="/courses" className="text-gray-900 dark:text-white hover:text-blue-500">
              Courses
            </Link>
            <Link href="/profile" className="text-gray-900 dark:text-white hover:text-blue-500">
              Profile
            </Link>
            <LogoutButton />
          </div>
        ) : null}

        {/* Theme Toggle */}
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
