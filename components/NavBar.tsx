"use client";

import { useEffect, useState, useMemo } from "react";
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

const NAV_ITEMS = {
  admin: [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/users", label: "Manage Users" },
    { href: "/admin/reports", label: "Reports" },
  ],
  student: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/courses", label: "Courses" },
    { href: "/profile", label: "Profile" },
  ],
} as const;

export default function NavBar() {
  const { setTheme } = useTheme();
  const [role, setRole] = useState<keyof typeof NAV_ITEMS | null>(null);

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role") || localStorage.getItem("role");
    if (storedRole && ["admin", "student"].includes(storedRole)) {
      setRole(storedRole as keyof typeof NAV_ITEMS);
    }

    const handleStorageChange = () => {
      const updatedRole = sessionStorage.getItem("role") || localStorage.getItem("role");
      if (updatedRole && ["admin", "student"].includes(updatedRole)) {
        setRole(updatedRole as keyof typeof NAV_ITEMS);
      } else {
        setRole(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const navLinks = useMemo(() => {
    if (!role) return null;
    return NAV_ITEMS[role].map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className="text-gray-900 dark:text-white hover:text-blue-500 transition-colors"
      >
        {label}
      </Link>
    ));
  }, [role]);

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Mobile Navigation */}
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
              {navLinks}
              <LogoutButton />
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo for Desktop */}
        <Link href="/" className="text-2xl font-semibold text-gray-900 dark:text-white hidden md:block">
          MyApp
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks}
        </div>

        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
