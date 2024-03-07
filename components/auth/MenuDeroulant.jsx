"use client";

import { Button } from "@/components/ui/button";
import { EggFried, Heart, PlusSquare, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export const MenuDeroulant = ({ currentUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outlineblue">
          {currentUser.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3 sm:mr-10">
        <DropdownMenuItem asChild>
          <Link href="/profil" className="font-medium">
            <User2 className="mx-2 w-5 text-myblue marker:h-5" />
            Mon profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/recette/mes-recettes" className="font-medium">
            <EggFried className="mx-2 w-5 text-myblue marker:h-5" />
            Mes recettes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/recette/ajouter" className="font-medium">
            <PlusSquare className="mx-2 w-5 text-myblue marker:h-5" />
            Ajouter une recette
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/favoris" className="font-medium">
            <Heart className="mx-2 w-5 text-myblue marker:h-5" />
            Favoris
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
