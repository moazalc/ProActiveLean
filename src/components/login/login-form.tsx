import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Şifre</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder="********"
          />
        </div>
        <Button type="submit" className="w-full">
          Giriş Yap
        </Button>
      </div>
    </form>
  );
}
