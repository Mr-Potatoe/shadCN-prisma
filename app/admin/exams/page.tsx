import Link from "next/link";
import { Button } from "@mui/material";

export default function ExamPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Exams</h1>
      <Link href="/admin/exams/create">
        <Button variant="contained" color="primary" className="mt-4">
          Create New Exam
        </Button>
      </Link>
    </div>
  );
}
