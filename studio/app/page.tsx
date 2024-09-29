import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
export default function Home() {
  return (
    <div className="overflow-hidden items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className=" bg-gray-50 dark:bg-inherit">
        <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5 dark:transform-gpu dark:bg-white/80 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]">
            <form action="#" method="POST" className="p-7 sm:p-11">
              <div className="flex items-start"></div>
              <h1 className="mt-8 text-base/6 font-medium">
                Better Auth Studio
              </h1>
              <p className="mt-1 text-sm/5 text-gray-600">
                Sign in to your account.
              </p>
              <div className="mt-8 space-y-3">
                <Label className="text-sm/5 font-medium">Email</Label>
                <Input
                  required
                  autoFocus
                  type="email"
                  name="email"
                  className={cn(
                    "block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10",
                    "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
                    "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black"
                  )}
                />
              </div>
              <div className="mt-8 space-y-3">
                <Label className="text-sm/5 font-medium">Password</Label>
                <Input
                  required
                  type="password"
                  name="password"
                  className={cn(
                    "block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10",
                    "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
                    "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black"
                  )}
                />
              </div>
              <div className="mt-8 flex items-center justify-between text-sm/5">
                <div className="flex items-center gap-3">
                  <Checkbox
                    name="remember-me"
                    className={cn(
                      "group block size-4 rounded border border-transparent shadow ring-1 ring-black/10 focus:outline-none",
                      "data-[checked]:bg-black data-[checked]:ring-black",
                      "data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-black"
                    )}
                  >
                    <CheckIcon className="fill-white opacity-0 group-data-[checked]:opacity-100" />
                  </Checkbox>
                  <Label>Remember me</Label>
                </div>
                <Link href="#" className="font-medium hover:text-gray-600">
                  Forgot password?
                </Link>
              </div>
              <div className="mt-8">
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </div>
            </form>
            <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
              Not a member?{" "}
              <Link href="#" className="font-medium hover:text-gray-600">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
