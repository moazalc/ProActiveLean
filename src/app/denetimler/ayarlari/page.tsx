"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AuditTypeSelect } from "@/components/denetimleri/audit-type-select";
import { AuditFrequencySelect } from "@/components/denetimleri/audit-frequency-select";
import { AuditSummary } from "@/components/denetimleri/audit-summary";

export default function AuditSettings() {
  const [auditType, setAuditType] = useState<string>("");
  const [auditFrequency, setAuditFrequency] = useState<string>("");
  const [customInterval, setCustomInterval] = useState<string>("");
  const { toast } = useToast();

  const handleSave = () => {
    if (!auditType) {
      toast({
        title: "Hata",
        description: "Lütfen bir denetim türü seçin.",
        variant: "destructive",
      });
      return;
    }

    if (auditType !== "unannounced" && !auditFrequency && !customInterval) {
      toast({
        title: "Hata",
        description: "Lütfen bir denetim sıklığı seçin.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save the settings to your backend or state management system
    console.log("Denetim ayarları kaydediliyor:", {
      auditType,
      auditFrequency,
      customInterval,
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
          <AuditTypeSelect
            auditType={auditType}
            onAuditTypeChange={(value) => {
              setAuditType(value);
              setAuditFrequency("");
              setCustomInterval("");
            }}
          />

          {auditType && (
            <AuditFrequencySelect
              auditType={auditType}
              auditFrequency={auditFrequency}
              customInterval={customInterval}
              onAuditFrequencyChange={setAuditFrequency}
              onCustomIntervalChange={setCustomInterval}
            />
          )}

          {auditType && (auditFrequency || customInterval) && (
            <AuditSummary
              auditType={auditType}
              auditFrequency={auditFrequency}
              customInterval={customInterval}
            />
          )}

          <div className="flex items-center justify-center pt-4">
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Planla
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
