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
    if (!session?.user?.email) return null;

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
