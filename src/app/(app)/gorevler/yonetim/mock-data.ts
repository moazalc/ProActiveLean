import { addDays } from "date-fns";

export const mockChecklistsWithAnswers = [
  {
    id: "1",
    title: "Kat -1 Denetimi",
    location: "Kat -1",
    dueDate: addDays(new Date(), 2),
    priority: "high" as const,
    status: "completed" as const,
    questions: [
      { id: "1", text: "Oda-1?", answer: true },
      { id: "2", text: "Oda-2?", answer: true },
      {
        id: "3",
        text: "Oda-3?",
        answer: false,
        comment: "Pencere açılmıyor",
      },
      { id: "4", text: "Oda-4", answer: true },
      { id: "5", text: "Oda-5", answer: true },
      { id: "6", text: "Oda-6", answer: true },
      {
        id: "7",
        text: "Oda-7",
        answer: false,
        comment: "Boya gerekiyor",
        image: "/placeholder.svg?height=200&width=200",
      },
      { id: "8", text: "Oda-8", answer: true },
    ],
  },
  {
    id: "2",
    title: "Lobi Kontrolü",
    location: "Ana Lobi",
    dueDate: addDays(new Date(), 1),
    priority: "medium" as const,
    status: "completed" as const,
    questions: [
      { id: "9", text: "Resepsiyon masası düzenli mi?", answer: true },
      { id: "10", text: "Bekleme alanı temiz mi?", answer: true },
      {
        id: "11",
        text: "Bilgilendirme panosu güncel mi?",
        answer: false,
        comment: "Güncellenme gerekiyor",
      },
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
      { id: "12", text: "Su kalitesi kontrol edildi mi?", answer: true },
      { id: "13", text: "Havuz çevresi temiz mi?", answer: true },
      {
        id: "14",
        text: "Can kurtaran ekipmanları yerinde mi?",
        answer: true,
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
  },
  {
    id: "4",
    title: "Restoran Kontrolü",
    location: "Ana Restoran",
    dueDate: addDays(new Date(), -1),
    priority: "high" as const,
    status: "completed" as const,
    questions: [
      { id: "15", text: "Çöpler atıldı mı?", answer: true },
      {
        id: "16",
        text: "Yumurtalar getirildi mi?",
        answer: false,
        comment: "Tedarikçi gecikti",
      },
      { id: "17", text: "Masa düzeni ve temizliği uygun mu?", answer: true },
    ],
  },
];
