"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    email: "",
    mobileNo: "",
    lrn: "",
    gender: "Male",
    birthDate: "",
    level: "student",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const registerChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success("Login successful! Redirecting...");
      setIsOpen(false);
      setTimeout(() => router.push("/dashboard"), 1500);
    } else {
      toast.error(data.error || "Invalid credentials.");
    }
  };

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success("Registration successful! Redirecting...");

      // Close the modal
      setIsOpenRegister(false);

      // Redirect after a slight delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      toast.error(data.error || "Something went wrong.");
    }
  };




  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-12 text-center">
      <header>
        <h1 className="text-3xl font-bold">Welcome to ZDSPDGC Entrance Exam System</h1>
        <p className="text-gray-600 mt-2">Your gateway to academic success starts here!</p>
      </header>

      <nav className="flex gap-4">
        <Dialog open={isOpenRegister} onOpenChange={(open) => setIsOpenRegister(open)}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpenRegister(true)}>Register</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-semibold">
                Create an Account
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>First Name</Label>
                  <Input name="fname" value={formData.fname} onChange={registerChangeHandler} required />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input name="lname" value={formData.lname} onChange={registerChangeHandler} required />
                </div>
              </div>
              <div>
                <Label>Username</Label>
                <Input name="username" value={formData.username} onChange={registerChangeHandler} required />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" name="email" value={formData.email} onChange={registerChangeHandler} required />
              </div>
              <div>
                <Label>Mobile No</Label>
                <Input name="mobileNo" value={formData.mobileNo} onChange={registerChangeHandler} required />
              </div>
              <div>
                <Label>LRN</Label>
                <Input name="lrn" value={formData.lrn} onChange={registerChangeHandler} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Gender</Label>
                  <select name="gender" value={formData.gender} onChange={registerChangeHandler} className="w-full p-2 border rounded-md">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <Label>Birth Date</Label>
                  <Input type="date" name="birthDate" value={formData.birthDate} onChange={registerChangeHandler} required />
                </div>
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" name="password" value={formData.password} onChange={registerChangeHandler} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>


        {/* Login Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>Login</Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">Welcome Back 👋</DialogTitle>
              <p className="text-center text-muted-foreground text-sm">Log in to your account to continue</p>
            </DialogHeader>

            <Card>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      name="username"
                      placeholder="Enter username"
                      required
                      value={loginData.username}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password Input with Toggle */}
                  <div className="space-y-1">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={loginData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                      >
                        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="text-right">
                    <a href="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  {/* Login Button with Loader */}
                  <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? <LoaderIcon className="animate-spin h-5 w-5 mx-auto" /> : "Login"}
                  </Button>
                </form>

                {/* Register Link */}
                <p className="text-sm text-center mt-4">
                 Wala kay account?{" "}
                  <span
                    onClick={() => {
                      setIsOpen(false);
                      setIsOpenRegister(true);
                    }}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Register
                  </span>
                </p>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </nav>

      <section className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I register for the exam?</AccordionTrigger>
            <AccordionContent>
              Click on the Register button above, fill out the form, and create an account.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What should I prepare for the exam?</AccordionTrigger>
            <AccordionContent>
              Ensure you have a stable internet connection and a quiet environment to focus.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How will I receive my results?</AccordionTrigger>
            <AccordionContent>
              Results will be sent to your registered email after evaluation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
