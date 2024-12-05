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
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setNewCompany({
            ...newCompany,
            logo: e.target?.result as string,
            dimensions: `${img.width}x${img.height}`,
            format: file.type.split("/")[1].toUpperCase(),
          });
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
      setIsDialogOpen(false);
    }
  };

  const handleEdit = (id: string, updatedCompany: CompanyInfo) => {
    setCompanies(
      companies.map((company) =>
        company.id === id ? { ...company, ...updatedCompany } : company
      )
    );
  };

  const handleDelete = (id: string) => {
    setCompanies(companies.filter((company) => company.id !== id));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl">Firma Ayarları</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  placeholder="Enter company name"
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
                  onChange={handleLogoUpload}
                  className="text-lg"
                />
              </div>
            </div>
            <Button
              onClick={handleAddCompany}
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
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  );
}
