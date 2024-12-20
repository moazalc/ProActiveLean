"use client";

import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataGrid } from "@/components/app-datatable";
import { Column } from "@/types/data-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: string;
  comment: string;
  image?: string;
  customerName: string;
  locationName: string;
  roomNumber: string;
  score: number;
  viewed: boolean;
}

const dummyReviews: Review[] = [
  {
    id: "1",
    comment: "Çok temiz bir oda.",
    image: "",
    customerName: "Ahmet Yılmaz",
    locationName: "Moaz's Palace",
    roomNumber: "101",
    score: 4.5,
    viewed: true,
  },
  {
    id: "2",
    comment: "Personel çok yardımseverdi.",
    customerName: "Ayşe Kaya",
    locationName: "The Residence",
    roomNumber: "205",
    score: 5,
    viewed: false,
  },
  {
    id: "3",
    comment: "Manzara harikaydı ama oda biraz gürültülüydü.",
    image: "",
    customerName: "Mehmet Demir",
    locationName: "Ahmet's Room",
    roomNumber: "308",
    score: 3.5,
    viewed: true,
  },
];

export default function ReviewMaker() {
  const [reviews, setReviews] = useState<Review[]>(dummyReviews);

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter((review) => review.id !== id));
    toast({
      title: "Yorum Silindi",
      description: "Yorum başarıyla silindi.",
      variant: "destructive",
    });
  };

  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  const columns: Column<Review>[] = [
    { key: "comment", header: "Yorum", sortable: true },
    {
      key: "image",
      header: "Resim",
      render: (value) =>
        value ? (
          <img
            src={typeof value === "string" ? value : undefined}
            alt="Review"
            className="w-16 h-16 object-cover"
          />
        ) : (
          <img
            src="https://media.istockphoto.com/id/1452662817/tr/vekt%C3%B6r/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=gjZN1wPOkEsxCCKjSIBBCVOAIoWVA_z26ougAPUAB7Q="
            alt="No Image"
            className="w-16 h-16 object-cover"
          />
        ),
    },
    { key: "locationName", header: "Konum", sortable: true },
    { key: "customerName", header: "Müşteri Adı", sortable: true },
    { key: "roomNumber", header: "Oda No", sortable: true },
    {
      key: "viewed",
      header: "Kontrol Edildi mi?",
      sortable: true,
      render: (value) => (value ? "Evet" : "Hayır"),
    },
    {
      key: "score",
      header: "Puan",
      sortable: true,
      render: (value) => (
        <RatingStars rating={typeof value === "number" ? value : 0} />
      ),
    },
  ];

  const renderActions = (review: Review) => (
    <div className="flex space-x-2">
      <Button
        onClick={() => {
          window.location.href = `/review/?id=${review.id}`;
        }}
        variant="outline"
        size="sm"
      >
        <Eye className="h-4 w-4" />
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
        <CardTitle className="text-2xl">Yorum Yönetimi</CardTitle>
      </CardHeader>
      <CardContent>
        <DataGrid
          data={reviews}
          columns={columns}
          pageSize={10}
          renderActions={renderActions}
        />
      </CardContent>
    </Card>
  );
}
