"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const data = [
  { subject: "Kalite", A: 120, B: 110, fullMark: 150 },
  { subject: "Güvenlik", A: 98, B: 130, fullMark: 150 },
  { subject: "Verimlilik", A: 86, B: 130, fullMark: 150 },
  { subject: "Performans", A: 99, B: 100, fullMark: 150 },
  { subject: "İnovasyon", A: 85, B: 90, fullMark: 150 },
  { subject: "Süreç", A: 65, B: 85, fullMark: 150 },
];

export function RadarMetrics() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Performans Metrikleri</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Hedef"
                dataKey="A"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
              <Radar
                name="Gerçekleşen"
                dataKey="B"
                stroke="hsl(var(--secondary))"
                fill="hsl(var(--secondary))"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
