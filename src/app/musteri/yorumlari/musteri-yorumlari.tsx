"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/star-rating";

interface ReviewSubject {
  id: number;
  name: string;
}

interface ReviewRating {
  reviewSubjectId: number;
  score: number;
}

export default function CustomerReview() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationId = searchParams.get("locationId");
  const roomNo = searchParams.get("roomNo");

  const [reviewSubjects, setReviewSubjects] = useState<ReviewSubject[]>([]);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [comment, setComment] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (locationId) {
      fetch(`/api/review-subjects/location/${locationId}`)
        .then((response) => response.json())
        .then((data: ReviewSubject[]) => {
          setReviewSubjects(data);
        })
        .catch((error) =>
          console.error("Error fetching review subjects:", error)
        );
    }
  }, [locationId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImage(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reviewRating: ReviewRating[] = Object.entries(ratings).map(
      ([id, score]) => ({
        reviewSubjectId: Number(id),
        score,
      })
    );

    const reviewData = {
      comment,
      relatedPlaceId: Number(locationId),
      customerName,
      viewed: false,
      roomNo,
      reviewRating,
    };

    fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Review created:", data);
      })
      .catch((error) => console.error("Error creating review", error));
  };

  return (
    <div className="flex items-center justify-center w-full max-w-4xl mx-auto">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Yorumunuzu Gönderin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="roomNo">Oda Numarası</Label>
              <Input id="roomNo" value={roomNo || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerName">İsim Soyisim</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Yorumunuz</Label>
              <Textarea
                id="comment"
                placeholder="Bize Deneyimlerinizi Anlatın..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Resim Yükle</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            </div>
            <div className="space-y-4">
              {reviewSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between"
                >
                  <span>{subject.name}</span>
                  <StarRating
                    name={`rating-${subject.id}`}
                    value={ratings[subject.id] || 0}
                    onChange={(value) => {
                      setRatings((prev) => ({
                        ...prev,
                        [subject.id]: value,
                      }));
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center mt-10">
              <Button type="submit" className="w-full">
                Gönder
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
