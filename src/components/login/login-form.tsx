"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";

export function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false });
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="items-center justify-center flex">
          <Image
            src="/images/logo.png"
            alt="ProActiveLean Logo"
            width={150}
            height={150}
          />
        </div>
        <CardTitle>Giriş Yap</CardTitle>
        <CardDescription>
          Hesabınıza erişmek için kimlik bilgilerinizi girin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={loginUser}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder=""
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder=""
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>
          </div>

          <Button className="w-full mt-4" type="submit">
            Giriş Yap
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
