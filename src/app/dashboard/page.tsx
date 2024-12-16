"use client";
import { WelcomeMessage } from "@/components/welcome-message";
import { RadarMetrics } from "@/components/charts/radar";
import { TasksCard } from "@/components/tasks-card";
import { TrendFilters } from "@/components/trend-filters";
import { TrendChart } from "@/components/charts/trend-chart";
import ReportsCards from "@/components/reports-cards";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeMessage />
      <ReportsCards />
      <div className="grid gap-6 md:grid-cols-2">
        <RadarMetrics />
        <TasksCard />
      </div>

      <TrendFilters
        onFilterChange={function (filters: {
          department: string;
          area: string;
          year: string;
          startMonth: string;
          endMonth: string;
        }): void {
          throw new Error("Function not implemented.");
        }}
      />
      <TrendChart />
    </div>
  );
}
