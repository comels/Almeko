"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./userActions";

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

// Fonction pour modifier une recette
export const updateRecipe = async (id, data) => {
  await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      category: data.category,
      servings: data.servings,
      vegetarian: data.vegetarian,
      withoutAlcool: data.withoutAlcool,
      ingredients: data.ingredients,
      instructions: data.instructions,
    },
  });
  console.log("Recipe updated");
  revalidatePath("/");
};

// Fonction pour ajouter une recette aux favoris
export const addFavorite = async (id) => {
  const user = await getCurrentUser();
  if (!user) {
    console.error(
      "Vous devez être connecté pour ajouter une recette aux favoris.",
    );
    return;
  }
  const isLiked = await prisma.like.findFirst({
    where: {
      recipeId: id,
      userId: user.id,
    },
  });
  if (isLiked) {
    await prisma.like.delete({
      where: {
        id: isLiked.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        recipeId: id,
        userId: user.id,
      },
    });
  }
  console.log("Ajout de la recette aux favoris :", id);
  revalidatePath("/");
};

// Fonction pour récupérer les recettes favorites d'un utilisateur
export const getFavorites = async () => {
  const user = await getCurrentUser();
  if (!user) {
    console.error("Vous devez être connecté pour voir vos recettes favorites.");
    return;
  }
  const favorites = await prisma.like.findMany({
    where: {
      userId: user.id,
    },
    include: {
      recipe: true,
    },
  });
  return favorites.map((favorite) => favorite.recipe);
};

// Fonction pour savoir si une recette est dans les favoris
export const recipeFavorite = async (recipeId) => {
  const user = await getCurrentUser();
  if (!user) {
    console.error("Vous devez être connecté pour voir vos recettes favorites.");
    return;
  }
  const isLiked = await prisma.like.findFirst({
    where: {
      recipeId: recipeId,
      userId: user.id,
    },
  });
  return isLiked ? true : false;
};
