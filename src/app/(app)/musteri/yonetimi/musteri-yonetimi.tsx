"use client";

import { useEffect, useState } from "react";
import { Star, Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/app-datatable";
import { Column } from "@/types/data-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: number;
  name: string;
  relatedPlaceId: number;
  createdBy: number;
  createBy: User;
  relatedPlace: Location;
}

interface Location {
  id: number;
  name: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export default function ReviewManager() {
  const [reviewSubjects, setReviewSubjects] = useState<Review[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [locations, setLocation] = useState<Location[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newReview, setNewReview] = useState<Partial<Review>>({
    name: "",
    relatedPlaceId: 0,
    createdBy: 0,
  });

  useEffect(() => {
    // Dummy data for initial population
    const dummyLocations: Location[] = [
      { id: 1, name: "Oda-1" },
      { id: 2, name: "Havuz" },
      { id: 3, name: "Bahçe" },
    ];

    const dummyUsers: User[] = [
      { id: 1, firstName: "Ahmet", lastName: "Yılmaz" },
      { id: 2, firstName: "Ayşe", lastName: "Kaya" },
      { id: 3, firstName: "Mehmet", lastName: "Demir" },
    ];

    const dummyReviews: Review[] = [
      {
        id: 1,
        name: "Oda-1",
        relatedPlaceId: 1,
        createdBy: 1,
        createBy: dummyUsers[0],
        relatedPlace: dummyLocations[0],
      },
      {
        id: 2,
        name: "Havuz",
        relatedPlaceId: 3,
        createdBy: 2,
        createBy: dummyUsers[1],
        relatedPlace: dummyLocations[2],
      },
      {
        id: 3,
        name: "Bahçe",
        relatedPlaceId: 2,
        createdBy: 3,
        createBy: dummyUsers[2],
        relatedPlace: dummyLocations[1],
      },
    ];

    setReviewSubjects(dummyReviews);
    setLocation(dummyLocations);
    setUsers(dummyUsers);

    // Fetch actual data (commented out for now)
    // fetch("/api/review-subjects")
    //   .then((res) => res.json())
    //   .then(setReviewSubjects);

    // fetch("/api/locations")
    //   .then((res) => res.json())
    //   .then(setLocation);

    // fetch("/api/users")
    //   .then((res) => res.json())
    //   .then(setUsers);
  }, []);

  const handleAddReview = () => {
    // Simulating API call
    const newId = Math.max(...reviewSubjects.map((r) => r.id)) + 1;
    const createdReview = {
      ...newReview,
      id: newId,
      createBy: users.find((u) => u.id === newReview.createdBy),
      relatedPlace: locations.find((l) => l.id === newReview.relatedPlaceId),
    } as Review;

    setReviewSubjects([...reviewSubjects, createdReview]);
    setNewReview({ name: "", relatedPlaceId: 0, createdBy: 0 });
    setIsDialogOpen(false);
    toast({
      title: "İnceleme Eklendi",
      description: "Yeni inceleme başarıyla eklendi.",
    });
  };

  const handleSaveEdit = () => {
    if (!editingReview) return;

    const updatedReviews = reviewSubjects.map((review) =>
      review.id === editingReview.id
        ? {
            ...editingReview,
            createBy: users.find((u) => u.id === editingReview.createdBy) || {
              id: 0,
              firstName: "",
              lastName: "",
            },
            relatedPlace: locations.find(
              (l) => l.id === editingReview.relatedPlaceId
            ) || { id: 0, name: "" },
          }
        : review
    );

    setReviewSubjects(updatedReviews);
    setEditingReview(null);
    setIsDialogOpen(false);
    toast({
      title: "İnceleme Güncellendi",
      description: "İnceleme başarıyla güncellendi.",
    });
  };

  const handleDeleteReview = (id: number) => {
    setReviewSubjects(reviewSubjects.filter((review) => review.id !== id));
    toast({
      title: "İnceleme Silindi",
      description: "İnceleme başarıyla silindi.",
      variant: "destructive",
    });
  };

  const columns: Column<Review>[] = [
    { key: "name", header: "İnceleme Adı", sortable: true },
    {
      key: "relatedPlace",
      header: "İlgili Yer",
      sortable: true,
      render: (value) =>
        value && typeof value === "object" && "name" in value
          ? value.name
          : "-",
    },
    {
      key: "createBy",
      header: "Oluşturan Kullanıcı",
      sortable: true,
      render: (value) =>
        value &&
        typeof value === "object" &&
        "firstName" in value &&
        "lastName" in value
          ? `${value.firstName} ${value.lastName}`
          : "-",
    },
  ];

  const renderActions = (review: Review) => (
    <div className="flex space-x-2">
      <Button
        onClick={() => {
          setEditingReview(review);
          setIsDialogOpen(true);
        }}
        variant="outline"
        size="sm"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => handleDeleteReview(review.id)}
        variant="destructive"
        size="sm"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl">İnceleme Yönetimi</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Yeni İnceleme Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingReview ? "İncelemeyi Düzenle" : "Yeni İnceleme"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">İnceleme Adı</Label>
                <Textarea
                  id="name"
                  placeholder="İnceleme Adı"
                  value={editingReview?.name || newReview.name || ""}
                  onChange={(e) =>
                    editingReview
                      ? setEditingReview({
                          ...editingReview,
                          name: e.target.value,
                        })
                      : setNewReview({ ...newReview, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="relatedPlace">İlgili Yer</Label>
                <Select
                  value={(
                    editingReview?.relatedPlaceId ||
                    newReview.relatedPlaceId ||
                    ""
                  ).toString()}
                  onValueChange={(value) =>
                    editingReview
                      ? setEditingReview({
                          ...editingReview,
                          relatedPlaceId: Number(value),
                        })
                      : setNewReview({
                          ...newReview,
                          relatedPlaceId: Number(value),
                        })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem
                        key={location.id}
                        value={location.id.toString()}
                      >
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="createdBy">Oluşturan Kullanıcı</Label>
                <Select
                  value={(
                    editingReview?.createdBy ||
                    newReview.createdBy ||
                    ""
                  ).toString()}
                  onValueChange={(value) =>
                    editingReview
                      ? setEditingReview({
                          ...editingReview,
                          createdBy: Number(value),
                        })
                      : setNewReview({
                          ...newReview,
                          createdBy: Number(value),
                        })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.firstName} {user.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => {
                  setEditingReview(null);
                  setIsDialogOpen(false);
                }}
                variant="outline"
              >
                <X className="mr-2 h-4 w-4" /> İptal
              </Button>
              <Button
                onClick={editingReview ? handleSaveEdit : handleAddReview}
              >
                <Check className="mr-2 h-4 w-4" /> Kaydet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <DataGrid
          data={reviewSubjects}
          columns={columns}
          pageSize={10}
          renderActions={renderActions}
        />
      </CardContent>
    </Card>
  );
}
