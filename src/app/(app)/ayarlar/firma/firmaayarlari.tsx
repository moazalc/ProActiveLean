"use client";

import { useState, useRef } from "react";
import { DataGrid } from "@/components/app-datatable";
import { Column } from "@/types/data-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CompanyInfo {
  id: string;
  name: string;
  logo: string;
  dimensions: string;
  format: string;
}

const columns: Column<CompanyInfo>[] = [
  { key: "name", header: "Firma Adı", sortable: true },
  {
    key: "logo",
    header: "Logo",
    render: (value) => (
      <img
        src={value as string}
        alt="Company Logo"
        className="w-16 h-16 object-contain"
      />
    ),
  },
  { key: "dimensions", header: "Boyutlar", sortable: true },
  { key: "format", header: "Biçim", sortable: true },
];

export default function CompanyManagement() {
  const [companies, setCompanies] = useState<CompanyInfo[]>([]);
  const [newCompany, setNewCompany] = useState<Partial<CompanyInfo>>({
    name: "",
  });
  const [editingCompany, setEditingCompany] = useState<CompanyInfo | null>(
    null
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<CompanyInfo | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    isEditing: boolean
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const updatedCompany = {
            logo: e.target?.result as string,
            dimensions: `${img.width}x${img.height}`,
            format: file.type.split("/")[1].toUpperCase(),
          };
          if (isEditing && editingCompany) {
            setEditingCompany({ ...editingCompany, ...updatedCompany });
          } else {
            setNewCompany({ ...newCompany, ...updatedCompany });
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCompany = () => {
    if (newCompany.name && newCompany.logo) {
      const company: CompanyInfo = {
        id: Date.now().toString(),
        name: newCompany.name,
        logo: newCompany.logo,
        dimensions: newCompany.dimensions || "",
        format: newCompany.format || "",
      };
      setCompanies([...companies, company]);
      setNewCompany({ name: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditCompany = () => {
    if (editingCompany) {
      setCompanies(
        companies.map((company) =>
          company.id === editingCompany.id ? editingCompany : company
        )
      );
      setEditingCompany(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = (company: CompanyInfo) => {
    setCompanyToDelete(company);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (companyToDelete) {
      setCompanies(
        companies.filter((company) => company.id !== companyToDelete.id)
      );
      toast({
        title: "Firma Silindi",
        description: `${companyToDelete.name} adlı firma başarıyla silindi.`,
        variant: "destructive",
      });
      setCompanyToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const renderActions = (company: CompanyInfo) => (
    <div className="flex space-x-2">
      <Button
        onClick={() => {
          setEditingCompany(company);
          setIsEditDialogOpen(true);
        }}
        className="p-2"
        aria-label={`Edit ${company.name}`}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => handleDelete(company)}
        variant="destructive"
        className="p-2"
        aria-label={`Delete ${company.name}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl">Firma Ayarları</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Yeni Firma Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Firma Ekle</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="company-name" className="text-lg">
                  Firma Adı
                </Label>
                <Input
                  id="company-name"
                  value={newCompany.name}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, name: e.target.value })
                  }
                  placeholder="Firma Adı Girin"
                  className="text-lg"
                />
              </div>
              <div>
                <Label htmlFor="company-logo" className="text-lg">
                  Firma Logosu
                </Label>
                <Input
                  id="company-logo"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => handleLogoUpload(e, false)}
                  className="text-lg"
                />
              </div>
            </div>
            <Button
              onClick={() => {
                handleAddCompany();
                toast({
                  title: "Firma Eklendi",
                  description: `${newCompany.name} adlı firma başarıyla eklendi.`,
                });
              }}
              disabled={!newCompany.name || !newCompany.logo}
            >
              Ekle
            </Button>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <DataGrid
          data={companies}
          columns={columns}
          pageSize={5}
          renderActions={renderActions}
        />
      </CardContent>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Firma Düzenle</DialogTitle>
          </DialogHeader>
          {editingCompany && (
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="edit-company-name" className="text-lg">
                  Firma Adı
                </Label>
                <Input
                  id="edit-company-name"
                  value={editingCompany.name}
                  onChange={(e) =>
                    setEditingCompany({
                      ...editingCompany,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter company name"
                  className="text-lg"
                />
              </div>
              <div>
                <Label htmlFor="edit-company-logo" className="text-lg">
                  Firma Logosu
                </Label>
                <Input
                  id="edit-company-logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, true)}
                  className="text-lg"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src={editingCompany.logo}
                  alt={`${editingCompany.name} Logo`}
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          )}
          <Button
            onClick={() => {
              handleEditCompany();
              toast({
                title: "Firma Güncellendi",
                description: `${editingCompany?.name} adlı firma başarıyla düzenlendi.`,
              });
            }}
          >
            Kaydet
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Firmayı Sil</DialogTitle>
            <DialogDescription>
              Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              İptal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
