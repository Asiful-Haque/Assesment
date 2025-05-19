"use client"
import Home from "@/components/Home";
import IncomePredictor from "@/components/IncomePredictor";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";


export default function Dashboard() {
    const [selectedPage, setSelectedPage] = useState("home");

    return (
        <div className="flex min-h-screen">
            <Sidebar onSelectPage={setSelectedPage} />
            <main className="flex-1">
                {selectedPage === "home" && (
                    <Home />
                )}

                {selectedPage === "AI Model" && (
                    <IncomePredictor />
                )}

                {selectedPage === "settings" && (
                    <>
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <p>We will back to you soon.</p>
                    </>
                )}
            </main>
        </div>
    );
}
