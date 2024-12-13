"use client";
import { RadarChart } from "@/components/charts/radar";
import ReportsCards from "@/components/reports-cards";
import { Button } from "@/components/ui/button";

import React from "react";

const handleClose = () => {
  window.close();
};

export default function Dashboard() {
  return (
    <div>
      <Button
        onClick={handleClose}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Kill yourself button
      </Button>
      <ReportsCards />
      <div className="container mx-auto w-full">
        <RadarChart />
      </div>
    </div>
  );
}
