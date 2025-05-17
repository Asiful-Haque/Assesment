"use client";
import { useState } from "react";

export default function IncomePredictor() {
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [division, setDivision] = useState("");
    const [income, setIncome] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Age: parseInt(age),
                    Gender: gender,
                    Division: division,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch prediction");
            }

            const data = await response.json();
            setIncome(data.predicted_income);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#F9FAFB]">
            <header className="bg-white text-black p-6 text-center text-2xl font-bold border-b border-gray-200">
                AI Model For Prediction
            </header>
            <div className="max-w-md mx-auto mt-10 p-6 bg-[#F9FAFB] shadow-md rounded-xl ">
                <div>
                    <h2 className="text-2xl font-semibold mb-6 text-center">Predict Income</h2>
                    <input
                        type="number"
                        name="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Age"
                        className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="text"
                        name="Gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        placeholder="Gender"
                        className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="text"
                        name="Division"
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        placeholder="Division"
                        className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? "Predicting..." : "Predict Income"}
                    </button>

                    {income !== null && (
                        <p className="mt-4 text-green-600 text-center text-lg">
                            Predicted Income: ${income}
                        </p>
                    )}

                    {error && <p className="mt-4 text-red-600 text-center text-sm">{error}</p>}
                </div>
            </div>
        </div>
    );
}
