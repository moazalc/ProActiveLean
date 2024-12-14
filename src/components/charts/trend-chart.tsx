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

const data = [
  { month: "Ocak", dept1: 4, dept2: 3, dept3: 2 },
  { month: "Şubat", dept1: 3, dept2: 4, dept3: 3 },
  { month: "Mart", dept1: 5, dept2: 3, dept3: 4 },
  { month: "Nisan", dept1: 2, dept2: 4, dept3: 3 },
  { month: "Mayıs", dept1: 3, dept2: 3, dept3: 5 },
  { month: "Haziran", dept1: 4, dept2: 4, dept3: 4 },
  { month: "Temmuz", dept1: 3, dept2: 5, dept3: 3 },
  { month: "Ağustos", dept1: 4, dept2: 3, dept3: 4 },
  { month: "Eylül", dept1: 3, dept2: 4, dept3: 3 },
  { month: "Ekim", dept1: 5, dept2: 3, dept3: 5 },
  { month: "Kasım", dept1: 4, dept2: 4, dept3: 4 },
  { month: "Aralık", dept1: 3, dept2: 5, dept3: 3 },
];

export function TrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aylık Bulgu Trendi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="linear"
                dataKey="dept1"
                stroke="hsl(var(--primary))"
                name="Üretim"
                strokeWidth={2}
              />
              <Line
                type="linear"
                dataKey="dept2"
                stroke="hsl(var(--secondary))"
                name="Kalite"
                strokeWidth={2}
              />
              <Line
                type="linear"
                dataKey="dept3"
                stroke="hsl(var(--destructive))"
                name="Bakım"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
