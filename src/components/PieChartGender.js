    import React from "react";
    import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

    const COLORS = ["#4299e1", "#48bb78"]; // Add more colors if needed

    const PieChartGender = ({ data }) => {
        const genderMap = {};
        data.forEach((entry) => {
            const gender = entry.Gender?.toLowerCase();
            if (gender) {
                genderMap[gender] = (genderMap[gender] || 0) + 1;
            }
        });


        const genderChartData = Object.entries(genderMap).map(([gender, count]) => ({
            name: gender.charAt(0).toUpperCase() + gender.slice(1), 
            value: count,
        }));

        return (
            <div className="w-[100%] h-[400px] bg-white rounded shadow">
                <h2 className="p-4 bg-gradient-to-br rounded from-blue-600 to-blue-200 text-xl text-center font-semibold mb-4">
                    Gender wise Customers
                </h2>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ bottom: 90 }}>
                        <Pie
                            data={genderChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {genderChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    };

    export default PieChartGender;
