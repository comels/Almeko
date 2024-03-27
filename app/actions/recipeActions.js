"use server";

import { prisma } from "@/lib/prisma";
import RecipeSchema from "@/lib/recipeSchema";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./userActions";

// Fonction pour créer une recette
export const createRecipe = async (data) => {
  console.log(data);
  // Validation des données coté serveur
  const result = RecipeSchema.safeParse(data);
  if (!result.success) {
    return;
  }
  await prisma.recipe.create({
    data: {
      name: data.name,
      category: data.category,
      servings: data.servings,
      vegetarian: data.vegetarian,
      withoutAlcool: data.withoutAlcool,
      ingredients: data.ingredients,
      instructions: data.instructions,
      authorName: data.author.name,
      authorId: data.author.id,
    },
  });
  revalidatePath("/");
};

// Fonction pour supprimer une recette
export const deleteRecipe = async (id) => {
  await prisma.recipe.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
};

// Fonction pour trouver une recette par son id
export const findRecipeById = async (id) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id,
      },
    });
    return recipe;
  } catch (error) {
    return null;
  }
};

// Fonction pour modifier une recette
export const updateRecipe = async (id, data) => {
  // Validation des données coté serveur
  const result = RecipeSchema.safeParse(data);
  if (!result.success) {
    return;
  }
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
  revalidatePath("/");
};

// Fonction pour ajouter une recette aux favoris
export const addFavorite = async (id) => {
  const user = await getCurrentUser();
  if (!user) {
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
  revalidatePath("/");
};

// Fonction pour savoir si une recette est dans les favoris
export const recipeFavorite = async (recipeId) => {
  const user = await getCurrentUser();
  if (!user) {
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

// Fonction pour récupérer toutes les recettes
export const getAllRecipes = async () => {
  const recipes = await prisma.recipe.findMany();
  return recipes;
};

// Fonction pour récupérer les recettes likées par un utilisateur

export const getLikedRecipes = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return;
  }
  const likedRecipes = await prisma.like.findMany({
    where: {
      userId: user.id,
    },
    include: {
      recipe: true,
    },
  });
  return likedRecipes.map((like) => like.recipe) || [];
};
