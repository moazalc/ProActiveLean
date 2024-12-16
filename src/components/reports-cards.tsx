import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ReportsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="bg-purple-50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">
            Yapılan Denetim Sayısı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-800">21/27</div>
        </CardContent>
      </Card>
      <Card className="bg-blue-50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-blue-800">
            Toplam Bulgu Sayısı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-800">367</div>
        </CardContent>
      </Card>
      <Card className="bg-green-50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-green-800">
            Aksiyon Alınmış Bulgu Sayısı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-800">233/367</div>
        </CardContent>
      </Card>
      <Card className="bg-orange-50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-orange-800">
            Bulgu Kapanma Oranı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-800">63%</div>
        </CardContent>
      </Card>
    </div>
  );
}
