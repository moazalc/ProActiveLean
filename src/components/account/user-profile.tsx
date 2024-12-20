"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { UserProfile } from "@/types/users";

interface UserProfileProps {
  user: UserProfile;
  isAdmin?: boolean;
  onUpdate?: (user: UserProfile) => void;
  onChange: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export function UserProfileComponent({
  user,
  isAdmin = false,
  onUpdate,
}: UserProfileProps) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(user.avatar);

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      if (onUpdate) {
        // In a real app, you would upload the file to your server here
        onUpdate({ ...user, avatar: url });
      }

      toast({
        title: "Profil Fotoğrafı Güncellendi",
        description: "Profil fotoğrafınız başarıyla güncellendi.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kullanıcı Bilgisi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-100">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Profil Resmi"
                  width={120}
                  height={120}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  120 x 120
                </div>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 p-1 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-700 transition-colors"
            >
              <Camera className="h-4 w-4 text-white" />
              <input
                id="avatar-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Ad Soyad</Label>
            <Input
              value={`${user.firstName} ${user.lastName}`}
              readOnly={!isAdmin}
            />
          </div>

          <div className="grid gap-2">
            <Label>Rol</Label>
            <Input
              value={user.role ? user.role.name : ""}
              readOnly={!isAdmin}
            />
          </div>

          <div className="grid gap-2">
            <Label>Email</Label>
            <Input value={user.email} readOnly={!isAdmin} />
          </div>

          <div className="grid gap-2">
            <Label>Telefon</Label>
            <Input value={user.phone} readOnly={!isAdmin} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
