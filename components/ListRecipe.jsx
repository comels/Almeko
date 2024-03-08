"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";

const ListRecipes = ({ recipe }) => {
  return (
    <Link href={`/recette/${recipe.id}`}>
      <div class="flex min-h-40 max-w-xl flex-col justify-center rounded-lg border-8 border-myblue bg-white">
        <h1 class="mx-5 mb-4 text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
          {recipe.name}
        </h1>
        <div class="flex items-center justify-center gap-2">
          {recipe.vegetarian &&
            ["aperos", "entree", "plat"].includes(recipe.category) && (
              <Badge variant="secondary">Végétarien</Badge>
            )}
          {recipe.withoutAlcool && recipe.category === "cocktail" && (
            <Badge variant="secondary">Sans alcool</Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ListRecipes;
