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
        <Loader className="text-color1 h-5 w-5" />
      ) : (
        <LogIn className="text-color1 h-5 w-5" />
      )}
      <span className="text-color1 ml-2">{text}</span>
    </Button>
  );
};
