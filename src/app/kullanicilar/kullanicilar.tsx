"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { UserTable } from "@/components/users/user-table";
import { UserDialog } from "@/components/users/user-dialog";
import { User, AccountSettings } from "@/types/users";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Kullanicilar() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    userId: number | null;
  }>({
    isOpen: false,
    userId: null,
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kullanıcılar yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/roles");
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Roller yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleOpenUserDialog = (user?: User) => {
    setEditingUser(user);
    setIsUserDialogOpen(true);
  };

  const handleSaveUser = async (user: User, settings: AccountSettings) => {
    try {
      if (user.id) {
        await fetch(`/api/users/${user.id}`, {
          method: "PUT",
          body: JSON.stringify({ user, settings }),
          headers: { "Content-Type": "application/json" },
        });
        toast({
          title: "Kullanıcı Güncellendi",
          description: "Kullanıcı başarıyla güncellendi.",
        });
      } else {
        await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({ user, settings }),
          headers: { "Content-Type": "application/json" },
        });
        toast({
          title: "Kullanıcı Eklendi",
          description: "Yeni kullanıcı başarıyla eklendi.",
        });
      }
      fetchUsers();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kullanıcı kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = (id: number) => {
    setDeleteConfirmation({ isOpen: true, userId: id });
  };

  const confirmDeleteUser = async () => {
    if (deleteConfirmation.userId) {
      try {
        await fetch(`/api/users/${deleteConfirmation.userId}`, {
          method: "DELETE",
        });
        toast({
          title: "Kullanıcı Silindi",
          description: "Kullanıcı başarıyla silindi.",
        });
        fetchUsers();
      } catch (error) {
        toast({
          title: "Hata",
          description: "Kullanıcı silinirken bir hata oluştu.",
          variant: "destructive",
        });
      }
      setDeleteConfirmation({ isOpen: false, userId: null });
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold">Kullanıcılar</CardTitle>
          <Button
            onClick={() => handleOpenUserDialog()}
            className="w-full sm:w-auto flex items-center justify-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Yeni Kullanıcı Ekle</span>
            <span className="sm:hidden">Ekle</span>
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <UserTable
            users={users}
            onEdit={handleOpenUserDialog}
            onDelete={handleDeleteUser}
          />
        </CardContent>
      </Card>

      <UserDialog
        isOpen={isUserDialogOpen}
        onClose={() => setIsUserDialogOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
        roles={roles}
      />

      <AlertDialog
        open={deleteConfirmation.isOpen}
        onOpenChange={(isOpen) =>
          setDeleteConfirmation({ isOpen, userId: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kullanıcıyı Sil</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. Bu kullanıcıyı silmek istediğinizden emin
              misiniz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser}>
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
