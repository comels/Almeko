"use server";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const getSession = () => {
  return getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  const session = await getSession();
  if (!session?.user?.email) return null;

  const currentUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: session.user.email,
    },
    include: {
      recipes: true,
      likes: true,
    },
  });
  return currentUser;
};

// Fonction pour retrouver un utilisateur par son id
export const getUserById = async (id) => {
  if (!id) return null;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      recipes: true,
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

// Fonction pour retrouver tous les utilisateurs
export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
