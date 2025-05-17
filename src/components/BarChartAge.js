import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
    Cell,
} from "recharts";

const COLORS = [
    "#36A2EB",
    "#FF9F40",
    "#00C49F",
    "#FF7F50",
    "#D2691E",
    "#8A2BE2",
    "#00BFFF",
    "#40E0D0",
];

function BarChartData({ data }) {
    const divisionAgeStats = {};

    data.forEach(({ Age, Division }) => {
        if (!divisionAgeStats[Division]) {
            divisionAgeStats[Division] = { totalAge: 0, count: 0 };
        }
        divisionAgeStats[Division].totalAge += Age;
        divisionAgeStats[Division].count += 1;
    });

    const chartData = Object.entries(divisionAgeStats).map(([division, stats]) => ({
        division,
        averageAge: stats.totalAge / stats.count,
    }));

    return (
        <div className="w-[100%] h-[400px] bg-white rounded shadow">
            <h2 className="p-4 rounded bg-gradient-to-br from-blue-600 to-blue-200 text-xl text-center font-semibold mb-4">
                Average Age per Division
            </h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    layout="horizontal"
                    margin={{ left: 50, right: 50, top: 20, bottom: 90 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="division"
                        type="category"
                        interval={0}
                        label={{
                            value: "Division",
                            position: "insideLeft",
                            offset: -50,
                        }}
                    />
                    <YAxis
                        type="number"
                        tickCount={6}
                        label={{
                            value: "Average Age",
                            position: "insideLeft",
                            angle: -90,
                            offset: 10,
                        }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="averageAge">
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartData;
