import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  WashingMachineIcon as CleaningServices,
  ListIcon as FormatListBulleted,
  CalendarIcon as CalendarMonth,
  CheckIcon as FactCheck,
} from "lucide-react";

interface AreaStats {
  id: string;
  title: string;
  temelSoruCount: number;
  altSoruCount: number;
  color: string;
  icon: React.ReactNode;
}

interface QuestionCardFilterProps {
  areas: AreaStats[];
  selectedArea: string | null;
  onAreaChange: (areaId: string | null) => void;
}

const areaData: AreaStats[] = [
  {
    id: "1",
    title: "Temizlik",
    temelSoruCount: 5,
    altSoruCount: 15,
    color: "bg-green-100",
    icon: <CleaningServices className="h-6 w-6" />,
  },
  {
    id: "2",
    title: "Düzen",
    temelSoruCount: 3,
    altSoruCount: 9,
    color: "bg-blue-200",
    icon: <FormatListBulleted className="h-6 w-6" />,
  },
  {
    id: "3",
    title: "Bölüm Periyodik",
    temelSoruCount: 4,
    altSoruCount: 12,
    color: "bg-orange-300",
    icon: <CalendarMonth className="h-6 w-6" />,
  },
  {
    id: "4",
    title: "Kontroller",
    temelSoruCount: 6,
    altSoruCount: 18,
    color: "bg-red-300",
    icon: <FactCheck className="h-6 w-6" />,
  },
];

export function QuestionCardFilter({
  selectedArea,
  onAreaChange,
}: QuestionCardFilterProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {areaData.map((area) => (
        <Card
          key={area.id}
          className={`cursor-pointer transition-all ${area.color} text-black ${
            selectedArea === area.id ? "ring-2 ring-black" : ""
          }`}
          onClick={() =>
            onAreaChange(area.id === selectedArea ? null : area.id)
          }
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{area.title}</CardTitle>
            {area.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{area.temelSoruCount}</div>
            <p className="text-xs">Temel Soru</p>
            <div className="text-xl font-bold mt-2">{area.altSoruCount}</div>
            <p className="text-xs">Alt Soru</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
