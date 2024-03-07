import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function GET(request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error(
      "Vous devez être connecté pour voir vos recettes."
    );
  }

  const recipes = await prisma.recipe.findMany({
    where: {
      authorId: currentUser.id,
    },
  });

  return NextResponse.json(recipes);
}
