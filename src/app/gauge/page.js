"use client";
import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import { useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";


// tanstack function
    const fetchGaugeData = async () => {
        const response = await fetch("/data/monthly_data.csv");
        const text = await response.text();
        const parsed = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        });
        return parsed.data;
    };

export default function Gauge() {
    const [value, setValue] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["gaugeCSV"],
        queryFn: fetchGaugeData,
    });

    if (isLoading) return <p className="text-center">Loading gauge data...</p>;
    if (isError) return <p className="text-center text-red-500">Error loading gauge CSV data</p>;

    
    // console.log(data); 
    const maxValue = Math.max(...data.map((d) => d.sales));

    const segmentCount = 6; 
    const segmentStops = [
        0,
        ...Array.from({ length: segmentCount - 1 }, (_, i) =>
            Math.round(((i + 1) * maxValue) / segmentCount)
        ),
        maxValue, 
    ];

    function formatValue(val) {
        console.log("Val is ", val);
        if (val >= 1000000) {
            // return `${(val / 1000000).toFixed(1)}`;
            return (val / 1000000).toFixed(1);
        } else if (val >= 1000) {
            // return `${(val / 1000).toFixed(1)}`;
            return (val / 1000).toFixed(1);
        }
        return val;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="flex flex-row items-center bg-white p-6 gap-22">
                <div className="flex flex-col gap-2">
                    {data.map((monthData, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setValue(monthData.sales);
                                setSelectedMonth(monthData.month);
                            }}
                            className={`py-1 px-4 rounded cursor-pointer ${
                                selectedMonth === monthData.month
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-black hover:bg-blue-500"
                            }`}
                        >
                            {monthData.month}
                        </button>
                    ))}
                </div>

                <div>
                    <div className="relative mb-6">
                        <ReactSpeedometer
                            minValue={0}
                            maxValue={maxValue}
                            ringWidth={10}
                            customSegmentStops={segmentStops}
                            segmentColors={[
                                "#e84e28",
                                "#e84e28",
                                "#e6a528",
                                "#e6a528",
                                "#007fff",
                                "#007fff",
                            ]}
                            needleHeightRatio={0.72}
                            valueTextFontSize="16px"
                            needleTransitionDuration={2000}
                            needleTransition="easeElastic"
                            currentValueText={`${formatValue(value)}${
                                value >= 1000000 ? "m" : value >= 1000 ? "k" : " "
                            }`}
                            value={Number(value)}
                            labelFormat={(value) => {
                                return formatValue(value);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
