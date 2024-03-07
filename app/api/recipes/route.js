import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

// path: app/api/recipes/route.js (POST)
// fonction qui permet de créer une recette.
export async function POST(request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error(
      "Vous devez être connecté pour créer une recette.",
    );
  }

  const body = await request.json();
  const {
    author,
    name,
    category,
    servings,
    vegetarian,
    withoutAlcool,
    ingredients,
    instructions,
  } = body;

  Object.keys(body).forEach((value) => {
    if (!body[value]) {
      return NextResponse.error("Tous les champs sont obligatoires.");
    }
  });

  const recipe = await prisma.recipe.create({
    data: {
      name,
      category,
      servings,
      vegetarian,
      withoutAlcool,
      ingredients,
      instructions,
      authorId: author.id,
    },
  });

  return NextResponse.json(recipe);
}

// fonction qui permet de modifier une recette.
// path: app/api/recipes/route.js (PUT)
export async function PUT(request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error(
      "Vous devez être connecté pour modifier une recette.",
    );
  }

  const body = await request.json();
  const {
    id,
    name,
    category,
    servings,
    vegetarian,
    withoutAlcool,
    ingredients,
    instructions,
  } = body;

  Object.keys(body).forEach((value) => {
    if (!body[value]) {
      return NextResponse.error("Tous les champs sont obligatoires.");
    }
  });

  const recipe = await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      name,
      category,
      servings,
      vegetarian,
      withoutAlcool,
      ingredients,
      instructions,
    },
  });

  return NextResponse.json(recipe);
}

// fonction qui permet de supprimer une recette.
// path: app/api/recipes/route.js (DELETE)
export async function DELETE(request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error(
      "Vous devez être connecté pour supprimer une recette.",
    );
  }

  const body = await request.json();
  const { id } = body;

  await prisma.recipe.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ message: "Recette supprimée avec succès." });
}
