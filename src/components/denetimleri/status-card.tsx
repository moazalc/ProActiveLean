import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Audit } from "@/types/audit";

interface StatusCardsProps {
  audits: Audit[];
}

export function StatusCards({ audits }: StatusCardsProps) {
  const statusCounts = {
    all: audits.length,
    expired: audits.filter((a) => a.status === "Tarih Geçmişler").length,
    approaching: audits.filter((a) => a.status === "Denetim Tarihi Yaklaşanlar")
      .length,
    planned: audits.filter((a) => a.status === "Yapılacaklar").length,
    incomplete: audits.filter((a) => a.status === "Aksiyonları Devam Edenler")
      .length,
    closed: audits.filter((a) => a.status === "Kapanmışlar").length,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatusCard title="Tümü" count={statusCounts.all} />
      <StatusCard
        title="Tarih Geçmişler"
        count={statusCounts.expired}
        color="red"
      />
      <StatusCard
        title="Denetim Tarihi Yaklaşanlar"
        count={statusCounts.approaching}
        color="yellow"
      />
      <StatusCard
        title="Yapılacaklar"
        count={statusCounts.planned}
        color="gray"
      />
      <StatusCard
        title="Aksiyonları Devam Edenler"
        count={statusCounts.incomplete}
        color="blue"
      />
      <StatusCard
        title="Kapanmışlar"
        count={statusCounts.closed}
        color="green"
      />
    </div>
  );
}

interface StatusCardProps {
  title: string;
  count: number;
  color?: "red" | "yellow" | "gray" | "blue" | "green";
}

function StatusCard({ title, count, color = "gray" }: StatusCardProps) {
  const colorClasses = {
    red: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900",
    yellow:
      "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900",
    gray: "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800",
    blue: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900",
    green:
      "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900",
  };

  const textColorClasses = {
    red: "text-red-800 dark:text-red-200",
    yellow: "text-yellow-800 dark:text-yellow-200",
    gray: "text-gray-800 dark:text-gray-200",
    blue: "text-blue-800 dark:text-blue-200",
    green: "text-green-800 dark:text-green-200",
  };

  return (
    <Card className={`${colorClasses[color]} border`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-sm font-medium ${textColorClasses[color]}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-bold ${textColorClasses[color]}`}>
          {count}
        </p>
      </CardContent>
    </Card>
  );
}
