"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      className="font-medium"
      onClick={() => {
        startTransition(() => signOut());
      }}
    >
      {isPending ? (
        <Loader className="mx-2 w-5 marker:h-5 text-myblue" />
      ) : (
        <LogOut className="mx-2 w-5 marker:h-5 text-myblue" />
      )}
      Déconnexion
    </DropdownMenuItem>
  );
};
