"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  role: string;
}

export function useAuth(requiredRole?: string) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("/api/auth/session", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const data = await res.json();
      if (requiredRole && data.user.role !== requiredRole) {
        router.push("/login");
        return;
      }

      setUser(data.user);
      setLoading(false);
    };

    fetchSession();
  }, [router, requiredRole]);

  return { user, loading };
}
