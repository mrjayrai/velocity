import InventoryForecast from "@/components/re-order/ReOrderAnalysis";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velocity",
  description: "Velocity",
};

export default function InventoryForecastUI() {
  return (
    <>
    <InventoryForecast/>
    </>
  );
}
