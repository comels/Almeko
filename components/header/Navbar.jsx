"use client";

import Link from "next/link";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { Search } from "lucide-react";
import { MenuDeroulant } from "../auth/MenuDeroulant";
import { LoginButton } from "../auth/LoginButton";
import clsx from "clsx";

const Navbar = ({ currentUser }) => {
  return (
    <div className="flex items-center justify-between px-4 py-4 sm:gap-5 sm:px-10">
      <Link href="/">
        <h2 className="hidden text-4xl font-extrabold tracking-tighter text-myblue sm:block">
          Almeko
        </h2>
      </Link>
      <div className="mr-5 flex w-full max-w-xl rounded-md border pl-2 sm:mr-0">
        <Input className=" border-none" placeholder="Rechercher" />
        <Button variant="ghost">
          <Search className="h-5 w-5 text-myblue" />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/recette/ajouter"
          className={clsx(
            buttonVariants({ variant: "blue", size: "sm" }),
            "hidden md:flex",
          )}
        >
          Ajouter une recette
        </Link>
        {currentUser ? (
          <div className="hidden md:flex">
            <MenuDeroulant />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
};

export default Navbar;
