import React from "react";
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

// 1. Register the required Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function RevenueBarChart() {
  // 2. Define your chart data and labels
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [4000, 3000, 5000, 2780, 1890, 2390, 3490],
        backgroundColor: "#3b82f6", // Tailwind blue-500
        borderRadius: 6,
      },
    ],
  };

  // 3. Define your chart options (responsiveness, plugins, dark mode friendliness)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#9ca3af", // text color for dark/light mode
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
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
