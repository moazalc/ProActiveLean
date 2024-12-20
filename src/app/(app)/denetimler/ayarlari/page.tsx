"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AuditTypeSelect } from "@/components/denetimleri/audit-type-select";
import { AuditFrequencySelect } from "@/components/denetimleri/audit-frequency-select";
import { AuditSummary } from "@/components/denetimleri/audit-summary";
import { AuditCategorySelect } from "@/components/denetimleri/audit-category-select";
import { AuditorSelect } from "@/components/denetimleri/auditor-select";

export default function AuditSettings() {
  const [auditCategory, setAuditCategory] = useState<string>("");
  const [auditType, setAuditType] = useState<string>("");
  const [auditFrequency, setAuditFrequency] = useState<string>("");
  const [customInterval, setCustomInterval] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [auditor, setAuditor] = useState<string>("");
  const { toast } = useToast();

  const handleSave = () => {
    if (!auditCategory) {
      toast({
        title: "Hata",
        description: "Lütfen bir denetim kategorisi seçin.",
        variant: "destructive",
      });
      return;
    }

    if (!auditType) {
      toast({
        title: "Hata",
        description: "Lütfen bir denetim türü seçin.",
        variant: "destructive",
      });
      return;
    }

    if (!auditor) {
      toast({
        title: "Hata",
        description: "Lütfen bir denetçi seçin.",
        variant: "destructive",
      });
      return;
    }

    if (
      auditType !== "unannounced" &&
      !auditFrequency &&
      !customInterval &&
      !selectedDate
    ) {
      toast({
        title: "Hata",
        description: "Lütfen bir denetim sıklığı seçin.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save the settings to your backend or state management system
    console.log("Denetim ayarları kaydediliyor:", {
      auditCategory,
      auditType,
      auditFrequency,
      customInterval,
      selectedDate,
      auditor,
    });

    toast({
      title: "Başarılı",
      description: "Denetim ayarları başarıyla kaydedildi.",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Denetim Ayarları
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AuditCategorySelect
            auditCategory={auditCategory}
            onAuditCategoryChange={setAuditCategory}
          />

          <AuditTypeSelect
            auditType={auditType}
            onAuditTypeChange={(value) => {
              setAuditType(value);
              setAuditFrequency("");
              setCustomInterval("");
              setSelectedDate(undefined);
            }}
          />

          <AuditorSelect auditor={auditor} onAuditorChange={setAuditor} />

          {auditType && (
            <AuditFrequencySelect
              auditType={auditType}
              auditFrequency={auditFrequency}
              customInterval={customInterval}
              selectedDate={selectedDate}
              onAuditFrequencyChange={setAuditFrequency}
              onCustomIntervalChange={setCustomInterval}
              onSelectedDateChange={setSelectedDate}
            />
          )}

          {auditType && (auditFrequency || customInterval || selectedDate) && (
            <AuditSummary
              auditCategory={auditCategory}
              auditType={auditType}
              auditFrequency={auditFrequency}
              customInterval={customInterval}
              selectedDate={selectedDate}
              auditor={auditor}
            />
          )}

          <div className="flex items-center justify-center pt-4">
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Kaydet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
