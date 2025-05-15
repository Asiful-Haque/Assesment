"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User } from "lucide-react"; //For some icons
//They are shadcn ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("admin");

    const handleLogin = (e) => {  //This time manual login without database connection
        e.preventDefault();
        localStorage.setItem("admin", role);
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard"); //Sending to the dashboard page
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-blue-200 p-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-6 space-y-6">
                <div className="text-center space-y-1">
                    <h2 className="text-2xl font-bold">User Login</h2>
                    <p className="text-sm">
                        Sign in to access your analytics dashboard
                    </p>
                </div>
                {/* Log in form  */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 " />
                            <Input
                                id="email"
                                placeholder="admin@reneta.com"
                                className="pl-10"
                                defaultValue="admin@reneta.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 " />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"} 
                                className="pl-10 pr-10"
                                defaultValue="password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 "
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (   //Hide and show password icon
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    {/* Select part for role */}
                    <div className="space-y-2 w-[100%]"> 
                        <Label htmlFor="role">Login as</Label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="sales">Sales Representative</SelectItem>
                                <SelectItem value="analyst">Data Analyst</SelectItem>
                                <SelectItem value="Developer">Software Developer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="pt-2">
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
