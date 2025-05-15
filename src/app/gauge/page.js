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
    const [value, setValue] = useState(0); //value for each click
    const [selectedMonth, setSelectedMonth] = useState(null);  //which month is selected
    const [rangeLabel, setRangeLabel] = useState("");  //This is maintaining the status

    const { data, isLoading, isError } = useQuery({  //Tanstack query
        queryKey: ["gaugeCSV"],
        queryFn: fetchGaugeData,
    });

    if (isLoading) return <p className="text-center">Loading gauge data...</p>;
    if (isError) return <p className="text-center text-red-500">Error loading gauge CSV data</p>;

    // console.log(data);
    const maxValue = Math.max(...data.map((d) => d.sales));

    const segmentCount = 6;
    const segmentStops = [  //for the values per whole chart
        0,
        ...Array.from({ length: segmentCount - 1 }, (_, i) =>
            Math.round(((i + 1) * maxValue) / segmentCount)
        ),
        maxValue,
    ];

    function formatValue(val) {   //Making the value within k and m
        // console.log("Val is ", val);
        if (val >= 1000000) {
            // return ${(val / 1000000).toFixed(1)};
            return (val / 1000000).toFixed(1);
        } else if (val >= 1000) {
            // return ${(val / 1000).toFixed(1)};
            return (val / 1000).toFixed(1);
        }
        return val;
    }

    function determineRangeLabel(val) {  //Maintaining high,low,medium range
        if (val <= 3000000) {
            return "Low";
        } else if (val < 7000000) {
            return "Medium";
        } else {
            return "High";
        }
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
                                setRangeLabel(determineRangeLabel(monthData.sales));
                                // console.log(
                                //   "Range label is ",
                                //   determineRangeLabel(monthData.sales, maxValue)
                                // );
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
                            // labelFormat={(value) => {
                            //     return formatValue(value);
                            // }}
                        />
                    </div>
                </div>
                <div className="pb-100 pl-10">
                    <div className="flex flex-row gap-3 items-center justify-center w-full">
                        <div className="bg-blue-500 text-white p-3 rounded-lg mb-4 w-25 flex items-center justify-center">
                            <h1 className="text-white font-bold">Status</h1>
                        </div>
                        <div className="flex-1  font-bold mb-4 w-55">
                            {!rangeLabel ? (
                                <h1 className="text-black">Select a month to view the status</h1>
                            ) : (
                                <h1 className="text-black">{rangeLabel}</h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
