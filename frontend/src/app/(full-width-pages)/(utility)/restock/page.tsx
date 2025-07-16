import ReorderRecommendation from "@/components/re-stock/ReStock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velocity",
  description: "Velocity",
};

export default function InventoryForecastUI() {
  return (
    <>
    <ReorderRecommendation/>
    </>
  );
}
