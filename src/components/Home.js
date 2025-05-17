import React, { useState, useEffect } from "react";
import { Users, DollarSign, Calendar, Percent } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import PieChartGender from "./PieChartGender";
import BarChartData from "./BarChart";
import BarChartAge from "./BarChartAge";


function Home() {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState("");
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [averageAge, setAverageAge] = useState(0);
    const [averageIncome, setAverageIncome] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    // tanstack function to fetch the data
    const fetchAllData = async () => {
        const response = await fetch("/data/All_data.csv");
        const text = await response.text();
        const parsed = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        });
        return parsed.data;
    };

    const handleFilterByDivision = (divisionName) => { //This function is working by clicking filter division
        setSelectedDivision(divisionName);
        if (!divisionName) {   //For no filter setting as like original data
            setFilteredData(originalData);
            const stats = calculateDashboardStats(originalData);
            setTotalCustomers(stats.totalCustomers);
            setAverageAge(stats.averageAge);
            setAverageIncome(stats.averageIncome);
            setTotalIncome(stats.totalIncomeSum);
        } else {                 //For setting filter..setting data as per that
            const filtered = originalData.filter((item) => item.Division === divisionName);
            setFilteredData(filtered);
            const stats = calculateDashboardStats(filteredData);
            setTotalCustomers(stats.totalCustomers);
            setAverageAge(stats.averageAge);
            setAverageIncome(stats.averageIncome);
            setTotalIncome(stats.totalIncomeSum);
        }
    };

    const calculateDashboardStats = (inputData) => {  // Based on filter or original , it calculates all info
        const totalCustomers = inputData.length;
        let ageSum = 0;
        let incomeSum = 0;
        let countWithIncome = 0;
        let totalIncomeSum = 0;

        inputData.forEach((item) => {
            ageSum += item.Age || 0;
            if (item.Income > 0) {
                incomeSum += item.Income;
                countWithIncome++;
            }
            totalIncomeSum += item.Income || 0;
        });

        const averageAge = Math.round(ageSum / totalCustomers);
        const averageIncome = countWithIncome > 0 ? Math.round(incomeSum / countWithIncome) : 0;

        return {
            totalCustomers,
            averageAge,
            averageIncome,
            totalIncomeSum,
        };
    };

    const { data, isLoading, isError } = useQuery({
        //Tanstack query
        queryKey: ["InfoAll"],
        queryFn: fetchAllData,
    });

    useEffect(() => {
        if (data && data.length > 0) {
            setOriginalData(data);
            setFilteredData(data);

            const stats = calculateDashboardStats(data); //Making it common for both task real and filtered data
            setTotalCustomers(stats.totalCustomers);
            setAverageAge(stats.averageAge);
            setAverageIncome(stats.averageIncome);
            setTotalIncome(stats.totalIncomeSum);
        }
    }, [data]);

    if (isLoading) return <p className="text-center">Loading data...</p>;
    if (isError) return <p className="text-center text-red-500">Error loading CSV data</p>;

    // Build the stats array from states to make easy access form ui code
    const stats = [
        {
            title: "Total Customers",
            value: totalCustomers,
            icon: <Users className="h-4 w-4 text-blue-500" />,
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
        },
        {
            title: "Average Age",
            value: `${averageAge} years`,
            icon: <Calendar className="h-4 w-4 text-blue-500" />,
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
        },
        {
            title: "Average Income",
            value: `$${averageIncome.toLocaleString()}`,
            icon: <DollarSign className="h-4 w-4 text-blue-500" />,
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
        },
        {
            title: "Total Income",
            value: `$${totalIncome.toLocaleString()}`,
            icon: <Percent className="h-4 w-4 text-blue-500" />,
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
        },
    ];

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-white text-black p-6 text-2xl font-bold border-b border-gray-200">
                Dashboard
            </header>

            <main className="flex-1 overflow-y-auto p-4 bg-[#F9FAFB]">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-lg font-semibold">Filter by Division</h2>
                    <select
                        value={selectedDivision}
                        onChange={(e) => handleFilterByDivision(e.target.value)}
                        className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Divisions</option>
                        {[...new Set(originalData.map((item) => item.Division))].map(
                            (division, index) => (
                                <option key={index} value={division}>
                                    {division}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-sm border border-blue-100 rounded-lg p-6"
                        >
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">
                                        {stat.title}
                                    </p>
                                    <p className={`text-2xl font-bold ${stat.textColor}`}>
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`${stat.bgColor} p-2 rounded-md h-fit`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 bg-white rounded shadow h-100">
                        <BarChartData data={data} />
                    </div>
                    <div className="flex-1 h-100 bg-white rounded shadow">
                        <PieChartGender data={data} />
                    </div>
                </div>
                <div className="flex-1 h-100 bg-white rounded shadow">
                    <BarChartAge data={data} />
                </div>
            </main>

            <footer className="bg-white text-center text-gray-600 p-6 text-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                &copy; 2025 My Dashboard App
            </footer>
        </div>
    );
}

export default Home;
