"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";

const ListRecipes = ({ recipe }) => {
  return (
    <Link href={`/recette/${recipe.id}`}>
      <div className="border-color1 flex min-h-52 max-w-xl flex-col justify-center rounded-lg border-8 bg-white hover:border-opacity-80 hover:shadow-xl">
        <h1 className="mx-5 mb-1 text-center text-2xl font-extrabold tracking-tight">
          {recipe.name}
        </h1>
        <p className="text-color1 mb-4 text-center text-xs font-bold">
          <span className="text-gray-800">de</span> {recipe.authorName}
        </p>
        <div className="flex items-center justify-center gap-2">
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
