import { z } from "zod";

const RecipeSchema = z.object({
  author: z
    .object({
      name: z.string(),
      email: z.string().email(),
      id: z.string(),
      image: z.string(),
    })
    .optional(),
  name: z
    .string()
    .min(3, "Le nom de la recette doit faire au moins 3 caractères."),
  category: z.enum(["aperos", "entree", "plat", "dessert", "cocktail"], {
    required_error: "Veuillez choisir une catégorie.",
  }),
  servings: z.number(),
  vegetarian: z.boolean().optional(),
  withoutAlcool: z.boolean().optional(),
  ingredients: z
    .array(
      z.object({
        name: z
          .string()
          .min(3, "Le nom de l'ingrédient doit faire au moins 3 caractères."),
        quantity: z
          .string()
          .optional()
          .refine(
            (val) => {
              // Accepte une chaîne vide ou des nombres positifs (entiers ou flottants) sans signes "+" ou "-"
              return val === "" || /^([0-9]*[.])?[0-9]+$/.test(val);
            },
            {
              message:
                "La quantité doit être un nombre positif (séparé par un point si besoin) ou laissée vide. ",
            },
          ),
        measure: z.string(),
      }),
    )
    .min(1, "Au moins un ingrédient est requis."),
  instructions: z
    .array(
      z.object({
        content: z
          .string()
          .min(5, "L'instruction doit faire au moins 5 caractères."),
      }),
    )
    .min(1, "Au moins une instruction est requise."),
});

export default RecipeSchema;
