import React from "react";
import Dashboard from "./dashboard/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <Dashboard />
    </div>
  );
}
