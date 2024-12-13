import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer } from "../ui/chart";
const findingsData = [
  { area: "Alan 1", count: 10 },
  { area: "Alan 2", count: 6 },
  { area: "Alan 3", count: 9 },
  { area: "Alan 4", count: 7 },
  { area: "Alan 5", count: 4 },
];

export default function AlanlarBulgu() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alanlar vs Bulgu Sayısı</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={findingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4CAF50" name="Bulgu Sayısı" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
