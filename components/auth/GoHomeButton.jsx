"use client";

import { buttonVariants } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export const GoHomeButton = ({ text }) => {
  return (
    <Link className={buttonVariants({ variant: "ghost", size: "sm" })} href="/">
      <Home className="h-5 w-5 text-myblue" />
      <span className="ml-2 text-base font-bold">{text}</span>
    </Link>
  );
};
