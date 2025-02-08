"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

// ✅ Define types for Users and Exams
interface User {
  id: string;
  email: string;
  role: string;
}

interface Exam {
  id: string;
  title: string;
  subject: string;
}

export default function AdminDashboard() {
  // ✅ Use defined types
  const [users, setUsers] = useState<User[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth("ADMIN");

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setLoading(true);

        try {
          const [usersRes, examsRes] = await Promise.all([
            fetch("/api/admin/users"),
            fetch("/api/admin/exams"),
          ]);

          const [usersData, examsData] = await Promise.all([
            usersRes.json(),
            examsRes.json(),
          ]);

          // ✅ Ensure data matches the expected type
          setUsers(usersData as User[]);
          setExams(examsData as Exam[]);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setTimeout(() => setLoading(false), 500); // Small delay to avoid flickering
        }
      };

      fetchData();
    }
  }, [user]);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {/* Users Section */}
            <Card className="p-4 w-1/2">
              <h2 className="text-lg font-bold">Users</h2>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-5 w-3/5" />
                  <Skeleton className="h-5 w-2/4" />
                </div>
              ) : (
                <ul>
                  {users.map((user) => (
                    <li key={user.id}>
                      {user.email} ({user.role})
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            {/* Exams Section */}
            <Card className="p-4 w-1/2">
              <h2 className="text-lg font-bold">Exams</h2>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-5 w-3/5" />
                  <Skeleton className="h-10 w-1/3 mt-2" /> {/* Button skeleton */}
                </div>
              ) : (
                <>
                  <ul>
                    {exams.map((exam) => (
                      <li key={exam.id}>
                        {exam.title} - {exam.subject}
                      </li>
                    ))}
                  </ul>
                  <Link href="/admin/exams/create">
                    <Button className="mt-4">Create New Exam</Button>
                  </Link>
                </>
              )}
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
