"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Fonction pour créer une recette
export const createRecipe = async (data) => {
  await prisma.recipe.create({
    data: {
      name: data.name,
      category: data.category,
      servings: data.servings,
      vegetarian: data.vegetarian,
      withoutAlcool: data.withoutAlcool,
      ingredients: data.ingredients,
      instructions: data.instructions,
      authorId: data.author.id,
    },
  });
  console.log("Recipe created");
  revalidatePath("/");
};

// Fonction pour supprimer une recette
export const deleteRecipe = async (id) => {
  await prisma.recipe.delete({
    where: {
      id,
    },
  });
  console.log("Recipe deleted");
  revalidatePath("/");
};

// Fonction pour trouver une recette par son id
export const findRecipeById = async (id) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
  });
  return recipe;
};
