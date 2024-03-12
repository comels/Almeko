"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Loader } from "@/components/ui/loader";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTransition } from "react";

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      className="font-medium"
      onClick={() => {
        startTransition(() => signOut({ redirect: true, callbackUrl: "/" }));
      }}
    >
      {isPending ? (
        <Loader className="mx-2 w-5 text-myblue marker:h-5" />
      ) : (
        <LogOut className="mx-2 w-5 text-myblue marker:h-5" />
      )}
      Déconnexion
    </DropdownMenuItem>
  );
};
