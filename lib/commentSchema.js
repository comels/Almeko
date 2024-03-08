import { z } from "zod";

const CommentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Le contenu du commentaire ne peut pas être vide." })
    .max(500, {
      message: "Le contenu du commentaire ne peut pas dépasser 500 caractères.",
    }), // Exemple de limite de longueur
  recipeId: z
    .string()
    .min(1, { message: "L'identifiant de la recette est requis." }), // Rendre ce champ obligatoire
});

export default CommentSchema;
