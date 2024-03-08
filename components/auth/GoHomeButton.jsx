"use client";

import { buttonVariants } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { Loader } from "../ui/loader";

export const GoHomeButton = ({ text }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Link className={buttonVariants({ variant: "ghost", size: "sm" })} href="/">
      {isPending ? (
        <Loader className="h-5 w-5 text-myblue" />
      ) : (
        <Home className="h-5 w-5 text-myblue" />
      )}
      <span className="ml-2 text-base font-bold">{text}</span>
    </Link>
  );
};
