import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const tasks = [
  { id: 1, title: "1. denetim hazır", deadline: "Bugün" },
  { id: 2, title: "2. denetim hazır", deadline: "Yarın" },
  { id: 3, title: "3. denetim hazır", deadline: "3 gün" },
  { id: 4, title: "4. denetim hazır", deadline: "Bu hafta" },
];

export function TasksCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <CardTitle>Bekleyen Görevler</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between">
              <span className="font-medium">{task.title}</span>
              <span className="text-sm text-muted-foreground">
                {task.deadline}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
