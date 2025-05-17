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
} from "recharts";
function BarChartData({ data }) {
    const divisionMap = {};
    data.forEach(({ Division }) => {
        divisionMap[Division] = (divisionMap[Division] || 0) + 1;
    });

    const chartData = []; //Making array to provide the bar chart
    for (const division in divisionMap) {
        chartData.push({
            division: division,
            customers: divisionMap[division],
        });
    }

    return (
        <div className="w-[100%] h-[400px] bg-white rounded shadow">
            <h2 className="p-4 rounded bg-gradient-to-br from-blue-600 to-blue-200 text-xl text-center font-semibold mb-4">
                Customers per Division
            </h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="horizontal" margin={{ bottom: 90, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="division"
                        type="category"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                    />
                    <YAxis type="number" />
                    <Tooltip />
                    <Legend wrapperStyle={{ paddingTop: "50px" }} />

                    <Bar dataKey="customers" fill="#3182ce" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartData;
