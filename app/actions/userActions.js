"use server";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) throw new Error("Session not found");

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!currentUser) return null;
    return currentUser;
  } catch (error) {
    return null;
  }
};

// Fonction pour récupérer les recettes de l'utilisateur
export const getUserRecipes = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("Connectez-vous pour voir vos recettes");

  const recipes = await prisma.recipe.findMany({
    where: {
      authorId: currentUser.id,
    },
  });

  return recipes;
};

// Fonction pour retrouver un utilisateur par son id
export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

// Fonction pour mettre à jour un utilisateur
export const updateUser = async (id, data) => {
  await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return "/profil";
};
