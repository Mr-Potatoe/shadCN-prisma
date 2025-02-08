"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";



export default function CreateExamPage() {
  const router = useRouter();
  const { loading } = useAuth("ADMIN");


  const [examData, setExamData] = useState({
    title: "",
    description: "",
    subject: "",
    duration: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("/api/admin/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...examData,
        duration: Number(examData.duration), // Ensure duration is an integer
      }),
    });

    if (res.ok) {
      toast.success("Exam created successfully!");
      router.push("/admin/exams");
    } else {
      toast.error("Failed to create exam");
    }
  };

  return (
    <>
    {loading ? (
      <div className="max-w-2xl max-h-10 mx-auto mt-10">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3 mb-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-2/3 mb-4" />
          <Skeleton className="h-10 w-1/4" />
        </CardContent>
      </Card>
    </div> ) : (
    <>
    <div className="max-w-2xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Exam</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input name="title" value={examData.title} onChange={handleChange} required />
            </div>
            <div>
              <Label>Description</Label>
              <Input name="description" value={examData.description} onChange={handleChange} />
            </div>
            <div>
              <Label>Subject</Label>
              <Input name="subject" value={examData.subject} onChange={handleChange} required />
            </div>
            <div>
              <Label>Duration (mins)</Label>
              <Input name="duration" type="number" value={examData.duration} onChange={handleChange} required />
            </div>
            <div>
              <Label>Start Time</Label>
              <Input name="startTime" type="datetime-local" value={examData.startTime} onChange={handleChange} required />
            </div>
            <div>
              <Label>End Time</Label>
              <Input name="endTime" type="datetime-local" value={examData.endTime} onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full">Create Exam</Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </>
      )}
    </>
  );
}
