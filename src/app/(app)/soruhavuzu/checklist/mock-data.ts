export const mockLocations = [
  { id: "1", name: "Odalar" },
  { id: "2", name: "Restorant" },
  { id: "3", name: "Havuz" },
];

export const mockCategories = [
  {
    id: 1,
    name: "Otel Odası Temizliği",
    locationCategoryId: 1,
    locationCategory: { id: "1", name: "Katlar" },
    questions: [
      { question: "Oda-1?" },
      { question: "Oda-2?" },
      { question: "Oda-3?" },
    ],
    userId: 1,
  },
  {
    id: 2,
    name: "Restoran Hijyeni",
    locationCategoryId: 2,
    locationCategory: { id: "2", name: "Restoran" },
    questions: [
      { question: "Mutfak temiz mi?" },
      { question: "Yemek alanı dezenfekte edilmiş mi?" },
      { question: "Personel hijyen kurallarına uyuyor mu?" },
    ],
    userId: 1,
  },
  {
    id: 3,
    name: "Havuz Bakımı",
    locationCategoryId: 3,
    locationCategory: { id: "3", name: "Havuz" },
    questions: [
      { question: "Su kalitesi kontrol edildi mi?" },
      { question: "Havuz çevresi temiz mi?" },
      { question: "Güvenlik ekipmanları yerinde mi?" },
    ],
    userId: 1,
  },
];
