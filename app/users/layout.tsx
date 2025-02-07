// app/users/layout.tsx
"use client";

import { ToastProvider } from "@/components/ui/toast";
import { ToastViewport } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster"
import { ReactNode } from "react";

export default function UsersLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <div>
        {/* Your layout content */}
        {children}
        <Toaster />
      </div>
      <ToastViewport />
    </ToastProvider>
  );
}
