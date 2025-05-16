"use client"
import Home from "@/components/Home";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";


export default function Dashboard() {
    const [selectedPage, setSelectedPage] = useState("home");

    return (
        <div className="flex min-h-screen">
            <Sidebar onSelectPage={setSelectedPage} />
            <main className="flex-1">
                {selectedPage === "home" && (
                    <Home />
                )}

                {selectedPage === "analytics" && (
                    <>
                        <h1 className="text-2xl font-bold">Analytics</h1>
                        <p>This is your analytics page.</p>
                    </>
                )}

                {selectedPage === "settings" && (
                    <>
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <p>Adjust your preferences here.</p>
                    </>
                )}
            </main>
        </div>
    );
}
