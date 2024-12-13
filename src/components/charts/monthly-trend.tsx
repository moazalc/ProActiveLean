"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { TrendFilters } from "../trend-filters";
import { useState } from "react";
// Sample data - replace with your actual data
const generateData = (department: string, area: string) => {
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  return months.map((month) => ({
    month,
    findings: Math.floor(Math.random() * 10),
    resolved: Math.floor(Math.random() * 8),
    pending: Math.floor(Math.random() * 5),
  }));
};

export function MonthlyTrendChart() {
  const [data, setData] = useState(generateData("IT", "Area 1"));

  const handleFilterChange = (filters: any) => {
    // In a real application, you would fetch data based on these filters
    setData(generateData(filters.department, filters.area));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Aylık Bulgu Trendi</CardTitle>
      </CardHeader>
      <CardContent>
        <TrendFilters onFilterChange={handleFilterChange} />

        <ChartContainer
          config={{
            findings: {
              label: "Bulgular",
              color: "hsl(var(--chart-1))",
            },
            resolved: {
              label: "Çözülenler",
              color: "hsl(var(--chart-2))",
            },
            pending: {
              label: "Bekleyenler",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                className="text-sm"
                tick={{ fill: "hsl(var(--foreground))" }}
              />
              <YAxis
                className="text-sm"
                tick={{ fill: "hsl(var(--foreground))" }}
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="findings"
                stroke="var(--color-findings)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="var(--color-resolved)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="var(--color-pending)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
