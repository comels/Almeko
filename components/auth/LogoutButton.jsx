"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { buttonVariants } from "@/components/ui/button";

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      className={clsx(buttonVariants({ variant: "ghost" }))}
      onClick={() => {
        startTransition(() => signOut());
      }}
    >
      {isPending ? (
        <Loader className="mr-2 w-5 marker:h-5" />
      ) : (
        <LogOut className="mr-2 w-5 marker:h-5" />
      )}
      Déconnexion
    </DropdownMenuItem>
  );
};
