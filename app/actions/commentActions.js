"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./userActions";

// Fonction pour créer un commentaire
export const createComment = async (recipeId, data) => {
  const currentUser = await getCurrentUser();
  await prisma.comment.create({
    data: {
      content: data.content,
      authorId: currentUser.id,
      recipeId: recipeId,
    },
  });
  revalidatePath(`/recette/${recipeId}`);
};

// Fonction pour récupérer les commentaires d'une recette
export const getComments = async (recipeId) => {
  const comments = await prisma.comment.findMany({
    where: {
      recipeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
};

// Fonction pour supprimer un commentaire
export const deleteComment = async (commentId) => {
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  console.log("Comment deleted");
  revalidatePath("/");
};
