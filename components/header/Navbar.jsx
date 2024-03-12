"use client";

import clsx from "clsx";
import { Search } from "lucide-react";
import Link from "next/link";
import { LoginButton } from "../auth/LoginButton";
import { MenuDeroulant } from "../auth/MenuDeroulant";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";

const Navbar = ({ currentUser }) => {
  return (
    <div className="flex items-center justify-between px-4 py-4 sm:gap-5 sm:px-10">
      <Link href="/">
        <h2 className="hidden text-4xl font-extrabold tracking-tighter text-myblue sm:block">
          Almeko
        </h2>
      </Link>
      <div className=" flex w-full max-w-xl rounded-md border pl-2 sm:mr-0">
        <Input className=" border-none" placeholder="Rechercher" />
        <Button variant="ghost">
          <Search className="h-5 w-5 text-myblue" />
        </Button>
      </div>
      <div className="flex items-center md:gap-4">
        {currentUser ? (
          <Link
            href="/recette/ajouter"
            className={clsx(
              buttonVariants({ variant: "blue", size: "sm" }),
              "hidden md:flex",
            )}
          >
            Ajouter une recette
          </Link>
        ) : null}
        {currentUser ? (
          <div className="hidden md:flex">
            <MenuDeroulant />
          </div>
        ) : (
          <div className="hidden md:flex">
            <LoginButton text="Connexion" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
