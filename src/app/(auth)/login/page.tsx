import { LoginForm } from "@/components/login/login-form";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <Image
          src="/images/logo.png"
          alt="ProActiveLean Logo"
          width={150}
          height={150}
        />
        <LoginForm />
      </div>
    </>
  );
}
