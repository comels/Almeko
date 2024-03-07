"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteRecipe = async (id) => {
  await prisma.recipe.delete({
    where: {
      id,
    },
  });
  console.log("Recipe deleted");
  revalidatePath("/");
};
