"use client";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import Papa from "papaparse";

// Function for tanstack query
const fetchBarData = async () => {
    const response = await fetch("/data/barchart_data.csv");
    const text = await response.text();
    const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
    });
    return parsed.data.sort((a, b) => b.TotalSales - a.TotalSales); // sorting for visualization
};

// Color scale function
const getColor = (value) => {
    if (value >= 35) return "#7f2704";
    if (value >= 30) return "#a63603";
    if (value >= 25) return "#d94801";
    if (value >= 20) return "#f16913";
    if (value >= 15) return "#fd8d3c";
    if (value >= 10) return "#fdae6b";
    return "#fee6ce";
};

const generateTicks = (maxValue) => {
    const ticks = [];
    for (let i = 0; i <= maxValue; i += 2) {
        ticks.push(i);
    }
    return ticks;
};

const CustomTooltip = ({ active, payload }) => { //Making the labels for each bar
    if (active && payload && payload.length) {
       const { Product, TotalSales, TotalValue } = payload[0].payload;
        return (
            <div className="bg-white p-2 shadow-lg border border-gray-300 rounded">
                <p className="font-bold text-black">{`Product: ${Product}`}</p>
                <p className="text-black">{`Total Sales: ${TotalSales}`}</p>
                <p className="text-black">{`Total Value: ${TotalValue}`}</p>
            </div>
        );
    }
    return null;
};



export default function Home() {

const title = [
    { label: "40", color: "#7f2704" },
    { label: "35", color: "#a63603" },
    { label: "30", color: "#d94801" },
    { label: "25", color: "#f16913" },
    { label: "20", color: "#fd8d3c" },
    { label: "15", color: "#fdae6b" },
    { label: "10", color: "#fee6ce" },
];

    const { data, isLoading, isError } = useQuery({ //The tanstack query
        queryKey: ["csvData"],
        queryFn: fetchBarData,
    });

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Error loading CSV data</p>;

    const maxSales = Math.max(...data.map((entry) => entry.TotalSales)); //highest value for dynamic

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-5xl p-4 bg-white flex">
                <div className="w-full max-w-5xl p-4 bg-white">
                    <h1 className="text-2xl font-bold mb-4 text-center text-black">BarChart</h1>
                    <ResponsiveContainer width="100%" height={500}>
                        <BarChart data={data}>
                            <CartesianGrid vertical={false} stroke="#ccc" />
                            <XAxis
                                dataKey="Product"
                                label={{ value: "Product", position: "outsideBottom", dy: 10 }}
                            />
                            <YAxis
                                ticks={generateTicks(maxSales)}
                                label={{
                                    value: "Total Sales",
                                    angle: -90,
                                    position: "insideLeft",
                                    dy: 10,
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="TotalSales">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getColor(entry.TotalValue)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                                {/* This part is for making the list of color demo */}
                <div className="ml-6 p-4 bg-white"> 
                    <h2 className="text-lg font-bold mb-2 text-black">Total Value</h2>
                    <ul>
                        {title.map((item, index) => (
                            <li key={index} className="flex items-center">
                                <div
                                    className="w-2 h-10 mr-2 "
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="text-black">{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
