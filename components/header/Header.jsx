"use client";

import clsx from "clsx";
import Link from "next/link";
import { Search } from "../Search";
import { LoginButton } from "../auth/LoginButton";
import { MenuDeroulant } from "../auth/MenuDeroulant";
import { buttonVariants } from "../ui/button";

export const Header = ({ currentUser, allUsers, allRecipes }) => {
  return (
    <div className="fixed top-0 z-20  w-full bg-white">
      <div className="flex items-center justify-between px-4 py-4 sm:gap-5 sm:px-10">
        <Link href="/">
          <h2 className="text-color1 mr-4 mt-2 font-hogfish text-4xl font-extrabold tracking-widest sm:mr-0">
            ALMEKO
          </h2>
        </Link>
        <div className="flex items-center md:gap-4">
          <Search
            placeholder="Recherche"
            allUsers={allUsers}
            allRecipes={allRecipes}
          />
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
    </div>
  );
};
