import { useState, useMemo } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/app-datatable";
import { Column } from "@/types/data-grid";
import { Input } from "@/components/ui/input";
import { User } from "@/types/users";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

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
      key: "firstName",
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
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => {
            window.location.href = `/roles`;
          }}
        >
          {user.role?.name}
        </span>
      ),
    },
    { key: "email", header: "Email", sortable: true },
  ];

  const renderActions = (user: User) => (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon" onClick={() => onEdit(user)}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => onDelete(user.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div>
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
    </div>
  );
}
