"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
  
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
    if (!res.ok) return setError(data.error);
  
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role); // Store role properly
  
    // Delay redirection to ensure storage is updated
    setTimeout(() => {
      if (data.role === "ADMIN") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    }, 100);
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96 p-6">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button onClick={handleLogin} className="w-full mt-4">
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
