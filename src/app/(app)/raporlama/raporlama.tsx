"use client";

import { useState } from "react";
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
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import ReportsCards from "@/components/reports-cards";
import ReportsFilters from "@/components/reports-filters";
import AlanlarBulgu from "@/components/charts/Alanlar-bulgu";
import DepartmanBulgu from "@/components/charts/Departman-bulgu";

// Mock data

const monthlyAuditData = [
  { month: "Ocak", completed: 0, ongoing: 0, incomplete: 0 },
  { month: "Şubat", completed: 0, ongoing: 0, incomplete: 0 },
  { month: "Mart", completed: 0, ongoing: 0, incomplete: 0 },
  { month: "Nisan", completed: 0, ongoing: 0, incomplete: 0 },
  { month: "Mayıs", completed: 0, ongoing: 0, incomplete: 0 },
  { month: "Haziran", completed: 0, ongoing: 0, incomplete: 0 },
  { month: "Temmuz", completed: 0, ongoing: 0, incomplete: 0 },
  { month: "Ağustos", completed: 11, ongoing: 0, incomplete: 0 },
  { month: "Eylül", completed: 19, ongoing: 0, incomplete: 0 },
  { month: "Ekim", completed: 4, ongoing: 3, incomplete: 0 },
  { month: "Kasım", completed: 1, ongoing: 11, incomplete: 0 },
  { month: "Aralık", completed: 0, ongoing: 0, incomplete: 0 },
];

const auditorData = [
  {
    name: "Michael Jackson",
    role: "",
    auditScore: "0 / 0",
    attendanceScore: "0 / 0",
    performance: "100%",
  },
  {
    name: "Barack Obama",
    role: "",
    auditScore: "0 / 0",
    attendanceScore: "0 / 0",
    performance: "0%",
  },
];

export default function Raporlama() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleExportPDF = () => {
    console.log("Exporting PDF...");
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Tabs defaultValue="findings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="findings">Bulgu Raporları</TabsTrigger>
          <TabsTrigger value="performance">Performans Raporları</TabsTrigger>
        </TabsList>

        <TabsContent value="findings" className="space-y-6">
          {/* Metrics */}
          <ReportsCards />

          {/* Filters */}
          <ReportsFilters />

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <AlanlarBulgu />
            <DepartmanBulgu />
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Tabs defaultValue="audit-count">
            <TabsList>
              <TabsTrigger value="audit-count">
                Denetim Sayısı Raporu
              </TabsTrigger>
              <TabsTrigger value="auditor">Denetçi Raporu</TabsTrigger>
            </TabsList>

            <TabsContent value="audit-count" className="space-y-4">
              <div className="flex justify-between items-center">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Yıl Seç" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>

                <Button onClick={handleExportPDF}>
                  <Download className="mr-2 h-4 w-4" />
                  PDF'ye Aktar
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Aylara Göre Denetim Sayısı</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[400px]" config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyAuditData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="completed"
                          stackId="a"
                          fill="#4CAF50"
                          name="Tamamlandı"
                        />
                        <Bar
                          dataKey="ongoing"
                          stackId="a"
                          fill="#FFC107"
                          name="Devam Ediyor"
                        />
                        <Bar
                          dataKey="incomplete"
                          stackId="a"
                          fill="#F44336"
                          name="Tamamlanmamış"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="auditor" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <Input
                    placeholder="İsme göre ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-[300px]"
                  />
                  <Select
                    value={selectedMonth}
                    onValueChange={setSelectedMonth}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ay Seç" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ocak</SelectItem>
                      <SelectItem value="2">Şubat</SelectItem>
                      <SelectItem value="1">Ocak</SelectItem>
                      <SelectItem value="2">Şubat</SelectItem>
                      <SelectItem value="3">Mart</SelectItem>
                      <SelectItem value="4">Nisan</SelectItem>
                      <SelectItem value="5">Mayıs</SelectItem>
                      <SelectItem value="6">Haziran</SelectItem>
                      <SelectItem value="7">Temmuz</SelectItem>
                      <SelectItem value="8">Ağustos</SelectItem>
                      <SelectItem value="9">Eylül</SelectItem>
                      <SelectItem value="10">Ekim</SelectItem>
                      <SelectItem value="11">Kasım</SelectItem>
                      <SelectItem value="12">Aralık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleExportPDF}>
                  <Download className="mr-2 h-4 w-4" />
                  PDF'ye Aktar
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ad Soyad</TableHead>
                        <TableHead>Denetçilik</TableHead>
                        <TableHead>Yoklama Performansı</TableHead>
                        <TableHead>Performans</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditorData.map((auditor) => (
                        <TableRow key={auditor.name}>
                          <TableCell className="font-medium">
                            {auditor.name}
                            <div className="text-sm text-muted-foreground">
                              {auditor.role}
                            </div>
                          </TableCell>
                          <TableCell>{auditor.auditScore}</TableCell>
                          <TableCell>{auditor.attendanceScore}</TableCell>
                          <TableCell>{auditor.performance}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
