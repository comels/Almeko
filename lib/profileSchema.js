import { z } from "zod";

const ProfileSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom d'utilisateur doit contenir au moins 3 caractères.",
  }),
  bio: z
    .string()
    .max(500, {
      message: "La bio ne peut pas dépasser 500 caractères.",
    })
    .optional(),
  link: z.string().optional(),
});

export default ProfileSchema;
