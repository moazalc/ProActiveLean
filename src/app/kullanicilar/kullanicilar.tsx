"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/app-datatable";
import { Column } from "@/types/data-grid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { getAllUsers } from "./userManagerContexts";
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

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  phone?: string;
  createdAt: Date;
  lastLogin?: Date;
  roleId: number;
  avatar?: string;
  role?: { id: number; name: string; isAuditor: boolean };
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [userForm, setUserForm] = useState<Omit<User, "id" | "createdAt">>({
    firstName: "",
    lastName: "",
    roleId: 0,
    email: "",
    username: "",
    password: "",
    phone: "",
    avatar: "",
    role: {
      id: 0,
      name: "",
      isAuditor: false,
    },
  });
  // Add this after the users state declaration
  useEffect(() => {
    const dummyUsers: User[] = [
      {
        id: 1,
        firstName: "Moaz",
        lastName: "Yılmaz",
        email: "ahmet@example.com",
        username: "ahmet123",
        roleId: 1,
        role: { id: 1, name: "Yönetici", isAuditor: true },
        createdAt: new Date(),
      },
      {
        id: 2,
        firstName: "Zeynep",
        lastName: "Kaya",
        email: "ayse@example.com",
        username: "ayse456",
        roleId: 2,
        role: { id: 2, name: "Kullanıcı", isAuditor: false },
        createdAt: new Date(),
      },
    ];

    setUsers(dummyUsers);
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    userId: number | null;
  }>({
    isOpen: false,
    userId: null,
  });

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const resetUserForm = () => {
    setUserForm({
      firstName: "",
      lastName: "",
      roleId: 0,
      email: "",
      username: "",
      password: "",
      phone: "",
      avatar: "",
    });
  };

  const handleOpenUserDialog = (user?: User) => {
    if (user) {
      setUserForm(user);
      setEditingUserId(user.id);
    } else {
      resetUserForm();
    }
    setIsUserDialogOpen(true);
  };

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
      });
  }, []);

  const handleSaveUser = async () => {
    if (!validateEmail(userForm.email)) {
      toast({
        title: "Geçersiz E-posta",
        description: "Lütfen geçerli bir e-posta adresi girin.",
        variant: "destructive",
      });
      return;
    }

    if (editingUserId) {
      if (userForm.password === "") {
        delete userForm.password;
      }
      fetch(`/api/users/${editingUserId}`, {
        method: "PUT",
        body: JSON.stringify(userForm),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(
            users.map((user) =>
              user.id === editingUserId ? { ...user, ...userForm } : user
            )
          );
          toast({
            title: "Kullanıcı Güncellendi",
            description: "Kullanıcı başarıyla güncellendi.",
          });
        });
      setIsUserDialogOpen(false);
      resetUserForm();
    } else {
      fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userForm),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.ok) {
          var users = await getAllUsers();
          setUsers(users);
          setIsUserDialogOpen(false);
          resetUserForm();
          toast({
            title: "Kullanıcı Eklendi",
            description: "Yeni kullanıcı başarıyla eklendi.",
          });
        } else {
          toast({
            title: "Kullanıcı Eklenemedi",
            description: "Kullanıcı eklenirken bir hata oluştu.",
            variant: "destructive",
          });
        }
      });
    }
  };

  const handleDeleteUser = (id: number) => {
    setDeleteConfirmation({ isOpen: true, userId: id });
  };

  const confirmDeleteUser = () => {
    if (deleteConfirmation.userId) {
      fetch(`/api/users/${deleteConfirmation.userId}`, {
        method: "DELETE",
      }).then(() => {
        setUsers(users.filter((user) => user.id !== deleteConfirmation.userId));
        toast({
          title: "Kullanıcı Silindi",
          description: "Kullanıcı başarıyla silindi.",
          variant: "destructive",
        });
        setDeleteConfirmation({ isOpen: false, userId: null });
      });
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const columns: Column<User>[] = [
    { key: "id", header: "ID", sortable: true },
    {
      key: "name",
      header: "Ad Soyad",
      sortable: true,
      render: (_, user) => `${user.firstName} ${user.lastName}`,
    },
    {
      key: "role",
      header: "Rol",
      sortable: true,
      render: (_, user) => (
        <span
          style={{ cursor: "pointer", color: "#2563EB" }}
          onClick={() => {
            window.location.href = `/roles`;
          }}
        >
          {user.role?.name}
        </span>
      ),
    },
    { key: "email", header: "Email", sortable: true },
    {
      key: "isAuditor",
      header: "Denetim Yetkisi",
      sortable: true,
      render: (_, user) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            user.role?.isAuditor
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.role?.isAuditor ? "Evet" : "Hayır"}
        </span>
      ),
    },
  ];

  const renderActions = (user: User) => (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleOpenUserDialog(user)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => handleDeleteUser(user.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold">Kullanıcılar</CardTitle>
          <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenUserDialog()}
                className="w-full sm:w-auto flex items-center justify-center"
              >
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Yeni Kullanıcı Ekle</span>
                <span className="sm:hidden">Ekle</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingUserId
                    ? "Kullanıcıyı Düzenle"
                    : "Yeni Kullanıcı Ekle"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Ad</Label>
                    <Input
                      id="firstName"
                      value={userForm.firstName}
                      onChange={(e) =>
                        setUserForm({ ...userForm, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input
                      id="lastName"
                      value={userForm.lastName}
                      onChange={(e) =>
                        setUserForm({ ...userForm, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="username">Kullanıcı Adı</Label>
                  <Input
                    id="username"
                    value={userForm.username}
                    onChange={(e) =>
                      setUserForm({ ...userForm, username: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="password">Şifre</Label>
                  <Input
                    required
                    id="password"
                    type="password"
                    value={editingUserId ? "" : userForm.password}
                    onChange={(e) =>
                      setUserForm({ ...userForm, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={userForm.phone}
                    onChange={(e) =>
                      setUserForm({ ...userForm, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="roleId">Rol</Label>
                  <Select
                    required
                    value={userForm.roleId.toString()}
                    onValueChange={(value) =>
                      setUserForm({ ...userForm, roleId: parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {
                          roles.find((role) => role.id === userForm.roleId)
                            ?.name
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleSaveUser}>
                {editingUserId ? "Kullanıcıyı Düzenle" : "Ekle"}
              </Button>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="mb-4 sm:flex sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="search"
                className="pl-8 w-full"
                type="text"
                placeholder="Kullanıcıları İsme Göre Ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <DataGrid
            data={filteredUsers}
            columns={columns}
            pageSize={10}
            renderActions={renderActions}
          />
        </CardContent>
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
                Bu işlem geri alınamaz. Bu kullanıcıyı silmek istediğinizden
                emin misiniz?
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
      </Card>
    </div>
  );
}
