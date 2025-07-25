"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
// import { MoreDotIcon } from "@/icons";
// import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useState, useEffect } from "react";
// import { Dropdown } from "../ui/dropdown/Dropdown";
import api from "@/apilink.mjs";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function WeeklyUsageChart() {
  // const [isOpen, setIsOpen] = useState(false);
  const [weeklyUsage, setWeeklyUsage] = useState<number[]>([]);

  useEffect(() => {
    const fetchWeeklyUsage = async () => {
      try {
        const response = await fetch(api+"/inventory/monthly-usage"); // API should return { monthlyUsage: [...] }
        const data = await response.json();
        setWeeklyUsage(data.monthlyUsage || []);
      } catch (error) {
        console.error("Error fetching usage data:", error);
        setWeeklyUsage([0, 0, 0, 0, 0]); // fallback
      }
    };

    fetchWeeklyUsage();
  }, []);

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val} units`,
      },
    },
  };

  const series = [
    {
      name: "Used Quantity",
      data: weeklyUsage.length ? weeklyUsage : [0, 0, 0, 0, 0],
    },
  ];

  // function toggleDropdown() {
  //   setIsOpen(!isOpen);
  // }

  // function closeDropdown() {
  //   setIsOpen(false);
  // }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Monthly Usage
        </h3>

        {/* <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div> */}
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={180}
          />
        </div>
      </div>
    </div>
  );
}
