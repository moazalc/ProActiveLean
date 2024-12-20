"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountSettings } from "@/types/users";

interface AccountSettingsProps {
  settings: AccountSettings;
  isAdmin?: boolean;
  onUpdate?: (settings: AccountSettings) => void;
}

export function AccountSettingsComponent({
  settings,
  isAdmin = false,
  onUpdate,
}: AccountSettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSettingChange = (
    type: "locations" | "departments" | "roles",
    value: string
  ) => {
    if (!isAdmin) return;

    const key = `selected${
      type.charAt(0).toUpperCase() + type.slice(1)
    }` as keyof AccountSettings;
    const newSettings = {
      ...localSettings,
      [key]: [...(localSettings[key] as string[]), value],
    };

    setLocalSettings(newSettings);
    onUpdate?.(newSettings);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hesap Ayarları</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {/* İlgili Yer Column */}
          <div className="space-y-4">
            <h3 className="font-medium">İlgili Yer</h3>
            {[1, 2, 3].map((index) => (
              <Select
                key={`location-${index}`}
                disabled={!isAdmin}
                onValueChange={(value) =>
                  handleSettingChange("locations", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  {settings.locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
            <div className="mt-2 p-2 border rounded-lg">
              {localSettings.selectedLocations.map((location) => (
                <div key={location} className="text-sm text-gray-600 p-1">
                  {location}
                </div>
              ))}
            </div>
          </div>

          {/* Departman Column */}
          <div className="space-y-4">
            <h3 className="font-medium">Departman</h3>
            {[1, 2, 3].map((index) => (
              <Select
                key={`department-${index}`}
                disabled={!isAdmin}
                onValueChange={(value) =>
                  handleSettingChange("departments", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  {settings.departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
            <div className="mt-2 p-2 border rounded-lg">
              {localSettings.selectedDepartments.map((department) => (
                <div key={department} className="text-sm text-gray-600 p-1">
                  {department}
                </div>
              ))}
            </div>
          </div>

          {/* Rol Column */}
          <div className="space-y-4">
            <h3 className="font-medium">Rol</h3>
            {[1, 2, 3].map((index) => (
              <Select
                key={`role-${index}`}
                disabled={!isAdmin}
                onValueChange={(value) => handleSettingChange("roles", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  {settings.roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
            <div className="mt-2 p-2 border rounded-lg">
              {localSettings.selectedRoles.map((role) => (
                <div key={role} className="text-sm text-gray-600 p-1">
                  {role}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
