"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EggFried, Heart, Menu, PlusSquare, User2 } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export const MenuDeroulant = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full" size="sm" variant="ghost">
          <Menu className="h-5 w-5 text-myblue" />
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
