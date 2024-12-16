"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Yeah fetch it from the API
async function fetchUsername() {
  return "User";
}

export function WelcomeMessage() {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    fetchUsername().then(setUsername);
  }, []);

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h1 className="text-3xl font-bold text-primary">
          Hoş Geldiniz, {username}
        </h1>
      </CardContent>
    </Card>
  );
}
