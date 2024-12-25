"use client";

import React, { useState } from "react";
import { useSoruHavuzuStore } from "@/store/useSoruHavuzuStore";
import { CategoryType } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  PlusCircle,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  BrushIcon as Broom,
  Layers,
  Calendar,
  CheckSquare,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SoruHavuzuPage() {
  const {
    categories,
    addMainQuestion,
    editMainQuestion,
    deleteMainQuestion,
    addSubQuestion,
    editSubQuestion,
    deleteSubQuestion,
  } = useSoruHavuzuStore();

  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("Temizlik");
  const [newMainQ, setNewMainQ] = useState("");
  const [editMainId, setEditMainId] = useState<string | null>(null);
  const [editMainText, setEditMainText] = useState("");
  const [selectedMainForSub, setSelectedMainForSub] = useState<string | null>(
    null
  );
  const [newSubQ, setNewSubQ] = useState("");
  const [editSubId, setEditSubId] = useState<string | null>(null);
  const [editSubText, setEditSubText] = useState("");
  const [expandedMainQuestions, setExpandedMainQuestions] = useState<string[]>(
    []
  );

  const toggleMainQuestion = (id: string) => {
    setExpandedMainQuestions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getCategoryIcon = (category: CategoryType) => {
    switch (category) {
      case "Temizlik":
        return <Broom className="h-5 w-5" />;
      case "Düzen":
        return <Layers className="h-5 w-5" />;
      case "Bölum Periyodik":
        return <Calendar className="h-5 w-5" />;
      case "Krontoller":
        return <CheckSquare className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const countQuestions = (category: CategoryType) => {
    const cat = categories.find((c) => c.category === category);
    if (!cat) return { main: 0, sub: 0 };
    const mainCount = cat.mainQuestions.length;
    const subCount = cat.mainQuestions.reduce(
      (acc, mq) => acc + (mq.subQuestions?.length || 0),
      0
    );
    return { main: mainCount, sub: subCount };
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Soru Havuzu</h1>
      <p className="text-muted-foreground">
        Kategoriyi seçin ve bir soru oluşturun
      </p>

      {/* ADD MAIN QUESTION FORM */}
      <Card>
        <CardHeader>
          <CardTitle>Yeni Ana Soru Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="category-select">Kategori Seç</Label>
              <Select
                onValueChange={(value) =>
                  setSelectedCategory(value as CategoryType)
                }
                value={selectedCategory}
              >
                <SelectTrigger id="category-select">
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.category} value={cat.category}>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(cat.category)}
                        <span>{cat.category}</span>
                        <span className="text-muted-foreground text-sm">
                          ({countQuestions(cat.category).main} ana,{" "}
                          {countQuestions(cat.category).sub} alt)
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="main-question">Ana Soru</Label>
              <Input
                id="main-question"
                value={newMainQ}
                onChange={(e) => setNewMainQ(e.target.value)}
                placeholder="Ana soru metni..."
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={() => {
                  if (!newMainQ.trim()) return;
                  addMainQuestion(selectedCategory, newMainQ.trim());
                  setNewMainQ("");
                  toast({
                    title: "Ana soru eklendi",
                    description: "Yeni ana soru başarıyla eklendi.",
                  });
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Ekle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RENDER ALL CATEGORIES AND THEIR MAIN QUESTIONS */}
      <div className="space-y-6">
        {categories.map((cat) => (
          <Card key={cat.category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getCategoryIcon(cat.category)}
                {cat.category}
                <span className="text-muted-foreground text-sm">
                  ({countQuestions(cat.category).main} ana,{" "}
                  {countQuestions(cat.category).sub} alt)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {cat.mainQuestions.map((mq, mqIndex) => (
                  <li
                    key={mq.id}
                    className="border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    {editMainId === mq.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={editMainText}
                          onChange={(e) => setEditMainText(e.target.value)}
                        />
                        <Button
                          onClick={() => {
                            editMainQuestion(cat.category, mq.id, editMainText);
                            setEditMainId(null);
                            setEditMainText("");
                            toast({
                              title: "Ana soru güncellendi",
                              description: "Ana soru başarıyla güncellendi.",
                            });
                          }}
                        >
                          Kaydet
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setEditMainId(null);
                            setEditMainText("");
                          }}
                        >
                          Vazgeç
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">
                          {mqIndex + 1}. {mq.questionText}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setEditMainId(mq.id);
                              setEditMainText(mq.questionText);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <div className="grid gap-4">
                                <div className="space-y-2">
                                  <h4 className="font-medium leading-none">
                                    Silme Onayı
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    Bu ana soruyu silmek istediğinizden emin
                                    misiniz? Bu işlem geri alınamaz.
                                  </p>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="destructive"
                                    onClick={() => {
                                      deleteMainQuestion(cat.category, mq.id);
                                      toast({
                                        title: "Ana soru silindi",
                                        variant: "destructive",
                                        description:
                                          "Ana soru başarıyla silindi.",
                                      });
                                    }}
                                  >
                                    Evet, Sil
                                  </Button>
                                  <Button>İptal</Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <Button
                            onClick={() => setSelectedMainForSub(mq.id)}
                            variant="outline"
                            size="sm"
                          >
                            Alt Soru Ekle
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleMainQuestion(mq.id)}
                          >
                            {expandedMainQuestions.includes(mq.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* SUB-QUESTIONS */}
                    {expandedMainQuestions.includes(mq.id) &&
                      mq.subQuestions &&
                      mq.subQuestions.length > 0 && (
                        <ul className="mt-2 space-y-2 pl-6">
                          {mq.subQuestions.map((sq, sqIndex) => (
                            <li
                              key={sq.id}
                              className="flex items-center gap-2 bg-muted p-2 rounded-md"
                            >
                              {editSubId === sq.id ? (
                                <>
                                  <Input
                                    value={editSubText}
                                    onChange={(e) =>
                                      setEditSubText(e.target.value)
                                    }
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      editSubQuestion(
                                        cat.category,
                                        mq.id,
                                        sq.id,
                                        editSubText
                                      );
                                      setEditSubId(null);
                                      setEditSubText("");
                                      toast({
                                        title: "Alt soru güncellendi",
                                        description:
                                          "Alt soru başarıyla güncellendi.",
                                      });
                                    }}
                                  >
                                    Kaydet
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => {
                                      setEditSubId(null);
                                      setEditSubText("");
                                    }}
                                  >
                                    Vazgeç
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <span>
                                    {mqIndex + 1}.{sqIndex + 1}{" "}
                                    {sq.questionText}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setEditSubId(sq.id);
                                      setEditSubText(sq.questionText);
                                    }}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                      <div className="grid gap-4">
                                        <div className="space-y-2">
                                          <h4 className="font-medium leading-none">
                                            Silme Onayı
                                          </h4>
                                          <p className="text-sm text-muted-foreground">
                                            Bu alt soruyu silmek istediğinizden
                                            emin misiniz? Bu işlem geri
                                            alınamaz.
                                          </p>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                          <Button
                                            variant="destructive"
                                            onClick={() => {
                                              deleteSubQuestion(
                                                cat.category,
                                                mq.id,
                                                sq.id
                                              );
                                              toast({
                                                title: "Alt soru silindi",
                                                description:
                                                  "Alt soru başarıyla silindi.",
                                              });
                                            }}
                                          >
                                            Evet, Sil
                                          </Button>
                                          <Button>İptal</Button>
                                        </div>
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DIALOG TO ADD SUBQUESTION */}
      <Dialog
        open={Boolean(selectedMainForSub)}
        onOpenChange={() => setSelectedMainForSub(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alt Soru Ekle</DialogTitle>
            <DialogDescription>
              Seçili ana soru için alt soru eklemek istiyorsunuz.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sub-question">Alt Soru</Label>
            <Input
              id="sub-question"
              value={newSubQ}
              onChange={(e) => setNewSubQ(e.target.value)}
              placeholder="Alt soru metni..."
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (!newSubQ.trim() || !selectedMainForSub) return;
                const catWithMain = categories.find((cat) =>
                  cat.mainQuestions.some((mq) => mq.id === selectedMainForSub)
                );
                if (!catWithMain) return;

                addSubQuestion(
                  catWithMain.category,
                  selectedMainForSub,
                  newSubQ.trim()
                );
                setNewSubQ("");
                setSelectedMainForSub(null);
                toast({
                  title: "Alt soru eklendi",
                  description: "Yeni alt soru başarıyla eklendi.",
                });
              }}
            >
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
