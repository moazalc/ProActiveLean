"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DataGrid } from "@/components/app-datatable";
import { Column } from "@/types/data-grid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface Role {
  id: string;
  name: string;
  isAdmin: boolean;
  isAuditor: boolean;
  canAnswer: boolean;
}

export default function RolesManagementComponent() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState<Omit<Role, "id">>({
    name: "",
    isAdmin: false,
    canAnswer: false,
    isAuditor: false,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  useEffect(() => {
    fetch("/api/roles")
      .then((res) => res.json())
      .then(setRoles);
  }, []);

  const handleAddRole = () => {
    fetch("/api/roles", {
      method: "POST",
      body: JSON.stringify(newRole),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((role) => {
        setRoles([...roles, role]);
        setNewRole({
          name: "",
          isAdmin: false,
          canAnswer: false,
          isAuditor: false,
        });
        setIsDialogOpen(false);
        toast({
          title: "Rol Eklendi",
          description: `${role.name} rolü başarıyla eklendi.`,
        });
      });
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
  };

  const handleSaveEdit = () => {
    if (!editingRole) return;
    fetch(`/api/roles/${editingRole.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: editingRole.name,
        isAdmin: editingRole.isAdmin,
        canAnswer: editingRole.canAnswer,
        isAuditor: editingRole.isAuditor,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((role) => {
        setRoles(roles.map((r) => (r.id === role.id ? { ...r, ...role } : r)));
        setEditingRole(null);
        toast({
          title: "Rol Güncellendi",
          description: `${role.name} rolü başarıyla güncellendi.`,
        });
      });
  };

  const handleCancelEdit = () => {
    setEditingRole(null);
  };

  const handleDeleteRole = (id: string) => {
    fetch(`/api/roles/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setRoles(roles.filter((role) => role.id !== id));
        toast({
          title: "Rol Silindi",
          description: "Rol başarıyla silindi.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Hata",
          description: "Rol silinemedi, kullanıcılar bu role sahip olabilir.",
          variant: "destructive",
        });
      }
    });
  };

  const columns: Column<Role>[] = [
    { key: "name", header: "Rol Adı", sortable: true },
    {
      key: "isAdmin",
      header: "Admin",
      sortable: true,
      render: (value) => (value ? "Evet" : "Hayır"),
    },
    {
      key: "canAnswer",
      header: "Denetçi",
      sortable: true,
      render: (value) => (value ? "Evet" : "Hayır"),
    },
    {
      key: "isAuditor",
      header: "Denetim Yetkisi",
      sortable: true,
      render: (value) => (value ? "Evet" : "Hayır"),
    },
  ];

  const renderActions = (role: Role) => (
    <div className="flex space-x-2">
      {editingRole?.id === role.id ? (
        <>
          <Button onClick={handleSaveEdit} size="sm">
            <Check className="mr-2 h-4 w-4" /> Kaydet
          </Button>
          <Button onClick={handleCancelEdit} variant="outline" size="sm">
            <X className="mr-2 h-4 w-4" /> İptal
          </Button>
        </>
      ) : (
        <Button
          onClick={() => handleEditRole(role)}
          variant="outline"
          size="sm"
        >
          <Pencil className="mr-2 h-4 w-4" /> Düzenle
        </Button>
      )}
      <Button
        onClick={() => handleDeleteRole(role.id)}
        variant="destructive"
        size="sm"
      >
        <Trash2 className="mr-2 h-4 w-4" /> Sil
      </Button>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl">Roller Yöneticisi</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Rol Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Rol Ekle</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="role-name">Rol adı</Label>
                <Input
                  id="role-name"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                  placeholder="Rol adını girin"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is-admin"
                  checked={newRole.isAdmin}
                  onCheckedChange={(checked) =>
                    setNewRole({ ...newRole, isAdmin: checked })
                  }
                />
                <Label htmlFor="is-admin">Admin</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="can-audit"
                  checked={newRole.canAnswer}
                  onCheckedChange={(checked) =>
                    setNewRole({ ...newRole, canAnswer: checked })
                  }
                />
                <Label htmlFor="can-audit">Denetçi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="can-audit"
                  checked={newRole.isAuditor}
                  onCheckedChange={(checked) =>
                    setNewRole({ ...newRole, isAuditor: checked })
                  }
                />
                <Label htmlFor="is-auditor">Denetim Yetkisi</Label>
              </div>
            </div>
            <Button onClick={handleAddRole}>Kaydet</Button>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <DataGrid
          data={roles}
          columns={columns}
          pageSize={10}
          renderActions={renderActions}
        />
      </CardContent>
    </Card>
  );
}
