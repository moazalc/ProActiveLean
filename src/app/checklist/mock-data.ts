import { addDays } from "date-fns";

export const mockChecklists = [
  {
    id: "1",
    title: "Kat -1 Denetimi",
    location: "Kat -1",
    dueDate: addDays(new Date(), 2),
    priority: "high" as const,
    status: "pending" as const,
    questions: [
      { id: "1", text: "Oda-1?" },
      { id: "2", text: "Oda-2?" },
      { id: "3", text: "Oda-3?" },
      { id: "4", text: "Oda-4?" },
      { id: "5", text: "Oda-5?" },
      { id: "6", text: "Oda-6?" },
      { id: "7", text: "Oda-7?" },
      { id: "8", text: "Oda-8?" },
    ],
  },
  {
    id: "2",
    title: "Lobi Kontrolü",
    location: "Ana Lobi",
    dueDate: addDays(new Date(), 1),
    priority: "medium" as const,
    status: "pending" as const,
    questions: [
      { id: "9", text: "Resepsiyon masası düzenli mi?" },
      { id: "10", text: "Bekleme alanı temiz mi?" },
      { id: "11", text: "Bilgilendirme panosu güncel mi?" },
    ],
  },
  {
    id: "3",
    title: "Havuz Bakımı",
    location: "Açık Havuz",
    dueDate: new Date(),
    priority: "low" as const,
    status: "completed" as const,
    questions: [
      { id: "12", text: "Su kalitesi kontrol edildi mi?" },
      { id: "13", text: "Havuz çevresi temiz mi?" },
      { id: "14", text: "Can kurtaran ekipmanları yerinde mi?" },
    ],
  },
  {
    id: "4",
    title: "Restoran Kontrolü",
    location: "Ana Restoran",
    dueDate: addDays(new Date(), -1),
    priority: "high" as const,
    status: "overdue" as const,
    questions: [
      { id: "10", text: "Çöpler atldı mı?" },
      { id: "11", text: "Yumurtaları getirdin mi?" },
      { id: "12", text: "Masa düzeni ve temizliği uygun mu?" },
    ],
  },
];
