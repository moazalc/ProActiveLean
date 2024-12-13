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

const departmentData = [
  { department: "Housekeeping", count: 15 },
  { department: "F&B", count: 12 },
  { department: "Front Office", count: 8 },
  { department: "Technical", count: 10 },
];

export default function DepartmanBulgu() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Departmanlara Göre Bulgu Sayısı</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2196F3" name="Bulgu Sayısı" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
