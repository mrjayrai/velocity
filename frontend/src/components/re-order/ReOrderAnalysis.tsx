"use client";

import React, { useEffect, useState } from "react";
import api from "@/apilink.mjs";

type ItemData = {
  itemName: string;
  predictedDaysLeft: number;
  quantityAvailable: number;
};

type GroupedItem = {
  itemName: string;
  totalQuantity: number;
  avgPredictedDays: number;
  occurrences: number;
};

export default function InventoryForecast() {
  const [groupedData, setGroupedData] = useState<GroupedItem[]>([]);
  const [filteredData, setFilteredData] = useState<GroupedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState({
    minQty: "",
    maxQty: "",
    minDays: "",
    maxDays: "",
  });

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    async function fetchInventoryData() {
      try {
        const res = await fetch(api + "/inventory/re-order");
        const rawData: ItemData[] = await res.json();

        const grouped: Record<string, GroupedItem> = {};

        rawData.forEach((item) => {
          if (!grouped[item.itemName]) {
            grouped[item.itemName] = {
              itemName: item.itemName,
              totalQuantity: 0,
              avgPredictedDays: 0,
              occurrences: 0,
            };
          }

          grouped[item.itemName].totalQuantity += item.quantityAvailable;
          grouped[item.itemName].avgPredictedDays += item.predictedDaysLeft;
          grouped[item.itemName].occurrences += 1;
        });

        const result: GroupedItem[] = Object.values(grouped).map((item) => ({
          ...item,
          avgPredictedDays: Number(
            (item.avgPredictedDays / item.occurrences).toFixed(1)
          ),
        }));

        setGroupedData(result);
        setFilteredData(result);
      } catch (err) {
        console.error("Failed to fetch inventory forecast data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchInventoryData();
  }, []);

  useEffect(() => {
    const minQty = parseInt(filter.minQty);
    const maxQty = parseInt(filter.maxQty);
    const minDays = parseInt(filter.minDays);
    const maxDays = parseInt(filter.maxDays);

    const filtered = groupedData.filter((item) => {
      const qtyMatch =
        (isNaN(minQty) || item.totalQuantity >= minQty) &&
        (isNaN(maxQty) || item.totalQuantity <= maxQty);
      const daysMatch =
        (isNaN(minDays) || item.avgPredictedDays >= minDays) &&
        (isNaN(maxDays) || item.avgPredictedDays <= maxDays);
      return qtyMatch && daysMatch;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [filter, groupedData]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilter({ minQty: "", maxQty: "", minDays: "", maxDays: "" });
  };

  const getStatusColor = (days: number) => {
    if (days < 10) return "bg-red-500/10 text-red-700 dark:text-red-400";
    if (days < 20) return "bg-yellow-400/10 text-yellow-600 dark:text-yellow-400";
    return "bg-green-500/10 text-green-700 dark:text-green-400";
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] p-5 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4">
        Inventory Forecast
      </h2>

      {/* Filter UI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <input
          type="number"
          name="minQty"
          placeholder="Min Quantity"
          value={filter.minQty}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded-md bg-white dark:bg-white/10 dark:text-white"
        />
        <input
          type="number"
          name="maxQty"
          placeholder="Max Quantity"
          value={filter.maxQty}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded-md bg-white dark:bg-white/10 dark:text-white"
        />
        <input
          type="number"
          name="minDays"
          placeholder="Min Days Left"
          value={filter.minDays}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded-md bg-white dark:bg-white/10 dark:text-white"
        />
        <input
          type="number"
          name="maxDays"
          placeholder="Max Days Left"
          value={filter.maxDays}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded-md bg-white dark:bg-white/10 dark:text-white"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          Reset Filters
        </button>
      </div>

      {loading ? (
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="overflow-auto custom-scrollbar max-h-[500px]">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="sticky top-0 z-10 text-xs uppercase bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 backdrop-blur">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3 text-right">Total Quantity</th>
                  <th className="px-4 py-3 text-right">Avg Days Left</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, idx) => (
                  <tr
                    key={idx}
                    className="transition hover:bg-gray-50 dark:hover:bg-white/10 border-b dark:border-gray-700"
                  >
                    <td className="px-4 py-3 font-medium">{item.itemName}</td>
                    <td className="px-4 py-3 text-right">{item.totalQuantity}</td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          item.avgPredictedDays
                        )}`}
                      >
                        {item.avgPredictedDays} days
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No forecast data found.
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            <button
              className="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-md"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              className="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-md"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
