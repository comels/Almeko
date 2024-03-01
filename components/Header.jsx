"use client"

import { LoginButton } from "./auth/LoginButton";
import { MenuDeroulant } from "./auth/MenuDeroulant";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const Header = ({currentUser}) => {

  return (
    <div className="fixed top-0 z-20  w-full border-b-2 border-accent bg-background">
      <div className="flex justify-between gap-5 items-center sm:px-10 px-4 py-4">
        <Link href="/">
          <h2 className="text-4xl hidden sm:block tracking-tighter font-extrabold">
            Almeko
          </h2>
        </Link>
        <div className="flex w-full rounded-md pl-2 border max-w-xl">
          <Input className="text-lg border-none" placeholder="Rechercher" />
          <Button className="px-4" variant="ghost">
            <Search />
          </Button>
        </div>
        {currentUser ? <MenuDeroulant currentUser={currentUser} /> : <LoginButton />}
      </div>
    </div>
  );
};
