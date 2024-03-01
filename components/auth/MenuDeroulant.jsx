"use client";

import { Button } from "@/components/ui/button";
import { EggFried, Heart, User2 } from "lucide-react";
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
        <Button variant="outline">{currentUser.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="sm:mr-10 mr-3">
        <DropdownMenuItem asChild>
          <Link href="/profil" className="font-medium">
            <User2 className="mx-2 w-5 marker:h-5" />
            Mon profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profil" className="font-medium">
            <EggFried className="mx-2 w-5 marker:h-5" />
            Mes recettes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profil" className="font-medium">
            <Heart className="mx-2 w-5 marker:h-5" />
            Favoris
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
