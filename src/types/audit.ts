export interface Audit {
  id: string;
  locationCategoryId: string;
  createdByUserId: string;
  denetci: string;
  denetimTarihi: Date;
  tamamlanmaTarihi?: Date;
  tur: string;
  questionCount: number;
  yesCount: number;
  activity: { completed: boolean }[];
  status:
    | "Tarih Geçmişler"
    | "Denetim Tarihi Yaklaşanlar"
    | "Yapılacaklar"
    | "Aksiyonları Devam Edenler"
    | "Kapanmışlar";
}

export interface Location {
  id: string;
  name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}
