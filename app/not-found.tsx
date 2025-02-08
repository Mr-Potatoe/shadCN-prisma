// app/not-found.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <Card className="w-full sm:max-w-lg p-8 shadow-xl rounded-lg text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you&apos;re looking for might have been moved or deleted.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
        >
          <Link href="/">Go Back to Home</Link>
        </Button>
        <div className="mt-4">
          <Link href="/" passHref>
            <Button variant="link" className="text-gray-600">
              Or return to the homepage
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
