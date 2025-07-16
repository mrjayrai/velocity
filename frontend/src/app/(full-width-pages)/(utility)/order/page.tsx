import InventoryForecast from "@/components/re-order/ReOrderAnalysis";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Office",
  description: "Velocity",
};

export default function SignIn() {
  return (
    <>
    <InventoryForecast/>
    </>
  );
}
