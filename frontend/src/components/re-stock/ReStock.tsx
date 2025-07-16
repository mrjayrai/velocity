"use client";

import React, { useEffect, useState } from "react";
import api from "@/apilink.mjs"; // Ensure this points to your API file

type ReorderItem = {
  itemName: string;
  recommendedReorderQuantity: number;
  reorderNeeded: boolean;
};

export default function ReorderRecommendation() {
  const [items, setItems] = useState<ReorderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchReorderData() {
      try {
        const res = await fetch(api + "/inventory/re-stock"); // Update endpoint accordingly
        const data: ReorderItem[] = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch reorder data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReorderData();
  }, []);

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyles = (needed: boolean) =>
    needed
      ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
      : "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03]">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4">
        Reorder Recommendations
      </h2>

      <input
        type="text"
        placeholder="Search item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-white/10 text-sm text-gray-700 dark:text-white"
      />

      {loading ? (
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center">
          No reorder recommendations found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-white/5 transition hover:shadow"
            >
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                {item.itemName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Recommended Quantity:{" "}
                <span className="font-semibold text-gray-800 dark:text-white">
                  {item.recommendedReorderQuantity}
                </span>
              </p>
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusStyles(
                  item.reorderNeeded
                )}`}
              >
                {item.reorderNeeded ? "Needs Reorder" : "Sufficient Stock"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
