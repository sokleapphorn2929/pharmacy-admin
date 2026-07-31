import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function RevenueBarChart() {
  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Sold Items",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await axios.get("https://pharmacy-system-backend-j77b.onrender.com/api/dashboard/counts");
        const weeklyCounts = response.data.weekly_orders || [4000, 3000, 5000, 2780, 1890, 2390, 3490];

        setChartData({
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Weekly Sold Items",
              data: weeklyCounts,
              backgroundColor: "#3b82f6",
              borderRadius: 6,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching weekly chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#9ca3af",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9ca3af",
        },
      },
      y: {
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
        ticks: {
          color: "#9ca3af",
        },
      },
    },
  };

  return (
    <div className="w-full md:h-[58.5vh] h-[54.5vh] bg-white dark:bg-slate-900 rounded-lg outline-2 dark:outline-slate-700 outline-gray-300 overflow-hidden duration-300 md:p-5 p-1">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white text-center">
        Weekly Sold Items
      </h2>

      <div className="w-full h-[80%]">
        {loading ? (
          <div className="flex items-center justify-center h-full text-slate-400 font-medium">
            Loading chart data...
          </div>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}