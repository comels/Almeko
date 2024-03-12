"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTransition } from "react";

export const LoginButton = ({ text }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => {
        startTransition(() => signIn());
      }}
    >
      {isPending ? (
        <Loader className="h-5 w-5 text-myblue" />
      ) : (
        <LogIn className="h-5 w-5 text-myblue" />
      )}
      <span className="ml-2 text-myblue">{text}</span>
    </Button>
  );
};
