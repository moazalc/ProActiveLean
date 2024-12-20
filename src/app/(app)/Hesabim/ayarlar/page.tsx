"use client";

import { UserProfileComponent } from "@/components/account/user-profile";
import { AccountSettingsComponent } from "@/components/account/account-settings";

const dummySettings = {
  locations: ["Fabrika", "Departman", "Alan", "İstasyon", "Hücre"],
  departments: [
    "Üretim | Fabrika",
    "Makine Enerji | Fabrika",
    "Kalite Kontrol | Fabrika",
    "Sevkiyat | Fabrika",
    "Depo | Fabrika",
  ],
  roles: [
    "Fabrika Müdürü",
    "Moderatör",
    "Yönetici-Müdür",
    "Sorumlu",
    "Denetçi",
  ],
  selectedLocations: ["Fabrika"],
  selectedDepartments: ["Üretim | Fabrika"],
  selectedRoles: ["Fabrika Müdürü"],
};

export default function AccountPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid">
        <AccountSettingsComponent settings={dummySettings} />
      </div>
    </div>
  );
}
