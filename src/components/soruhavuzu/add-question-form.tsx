"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const areaOptions = [
  "Katlar",
  "Lobi",
  "Restorant",
  "Tuvaletler",
  "Bahçe",
  "Bölüm",
  "Havuz",
  "Toplanti Odalar",
];

interface AddQuestionFormProps {
  onSubmit: (data: {
    text: string;
    isChecklist: boolean;
    checklistItems: string[];
    areas: string[];
  }) => void;
  initialData?: {
    text: string;
    isChecklist: boolean;
    checklistItems: string[];
    areas: string[];
  };
}

export function AddQuestionForm({
  onSubmit,
  initialData,
}: AddQuestionFormProps) {
  const [isChecklist, setIsChecklist] = useState(
    initialData?.isChecklist || false
  );
  const [checklistItems, setChecklistItems] = useState<string[]>(
    initialData?.checklistItems || [""]
  );
  const [selectedAreas, setSelectedAreas] = useState<string[]>(
    initialData?.areas || []
  );
  const [questionText, setQuestionText] = useState(initialData?.text || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      text: questionText,
      isChecklist,
      checklistItems: isChecklist ? checklistItems.filter(Boolean) : [],
      areas: selectedAreas,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="question">Soru</Label>
          <Input
            id="question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="checklist">Checklistli Soru</Label>
          <Switch
            id="checklist"
            checked={isChecklist}
            onCheckedChange={setIsChecklist}
          />
        </div>

        {isChecklist && (
          <div className="space-y-2">
            <Label>Checklist Maddeleri</Label>
            {checklistItems.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const newItems = [...checklistItems];
                    newItems[index] = e.target.value;
                    if (index === checklistItems.length - 1 && e.target.value) {
                      newItems.push("");
                    }
                    setChecklistItems(newItems);
                  }}
                  placeholder={`Madde ${index + 1}`}
                />
                {index < checklistItems.length - 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setChecklistItems(
                        checklistItems.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <Label>İlgili Alanlar</Label>
          <Select
            onValueChange={(value) => {
              if (!selectedAreas.includes(value)) {
                setSelectedAreas([...selectedAreas, value]);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Alan seçin" />
            </SelectTrigger>
            <SelectContent>
              {areaOptions.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedAreas.map((area) => (
              <div
                key={area}
                className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center space-x-1"
              >
                <span>{area}</span>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedAreas(selectedAreas.filter((a) => a !== area))
                  }
                  className="text-secondary-foreground/70 hover:text-secondary-foreground"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button type="submit">Kaydet</Button>
    </form>
  );
}
