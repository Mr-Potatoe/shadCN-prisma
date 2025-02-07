'use client'

import { Toast, ToastDescription, ToastTitle, ToastProvider, ToastViewport } from "./toast";
import { useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState<
    { title: string; description?: string; variant?: "default" | "destructive" }[]
  >([]);

  const addToast = (toast: { title: string; description?: string; variant?: "default" | "destructive" }) => {
    setToasts((prev) => [...prev, toast]);

    // Automatically remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  };

  return {
    addToast,
    ToastContainer: () => (
      <ToastProvider>
        {toasts.map((toast, index) => (
          <Toast key={index} variant={toast.variant}>
            <div className="grid gap-1">
              <ToastTitle>{toast.title}</ToastTitle>
              {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
            </div>
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    ),
  };
}
