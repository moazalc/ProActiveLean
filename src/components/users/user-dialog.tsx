import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserProfileComponent } from "@/components/account/user-profile";
import { AccountSettingsComponent } from "@/components/account/account-settings";
import {
  User,
  UserProfile as UserProfileType,
  AccountSettings,
} from "@/types/users";
import { toast } from "@/hooks/use-toast";

interface UserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User, settings: AccountSettings) => void;
  user?: UserProfileType;
  roles: { id: number; name: string }[];
}

export function UserDialog({
  isOpen,
  onClose,
  onSave,
  user,
  roles,
}: UserDialogProps) {
  const [userForm, setUserForm] = useState<UserProfileType>(
    (user as UserProfileType) || {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      roleId: 0,
      avatar: "",
      canAudit: false,
      createdAt: "",
    }
  );

  const [accountSettings, setAccountSettings] = useState<AccountSettings>({
    locations: [],
    departments: [],
    roles: [],
    selectedLocations: [],
    selectedDepartments: [],
    selectedRoles: [],
  });

  const handleSave = () => {
    if (!validateEmail(userForm.email)) {
      toast({
        title: "Geçersiz E-posta",
        description: "Lütfen geçerli bir e-posta adresi girin.",
        variant: "destructive",
      });
      return;
    }

    onSave(
      { ...userForm, createdAt: new Date(userForm.createdAt) },
      accountSettings
    );
    onClose();
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {user ? "Kullanıcıyı Düzenle" : "Yeni Kullanıcı Ekle"}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <UserProfileComponent user={userForm} onChange={setUserForm} />
          </TabsContent>
          <TabsContent value="settings">
            <AccountSettingsComponent
              settings={accountSettings}
              isAdmin={true}
              onUpdate={setAccountSettings}
            />
          </TabsContent>
        </Tabs>
        <Button onClick={handleSave}>Kaydet</Button>
      </DialogContent>
    </Dialog>
  );
}
