"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { PostLayout } from "./PostLayout";
import CommentSchema from "@/lib/commentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { createComment } from "@/app/actions/commentActions";
import { useToast } from "../ui/use-toast";
import { CheckCircle2 } from "lucide-react";

export const WriteForm = ({ user, recipe }) => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit, // This function is used to submit the form and prevent the default behavior of the browser
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      authorId: user.id,
      recipeId: recipe.id,
      content: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createComment(recipe.id, data);
      toast({
        icon: <CheckCircle2 className="text-green-600" />,
        title: "Commentaire publié.",
        description: "Merci !",
      });
      reset();
    } catch (error) {
      toast({
        icon: <CheckCircle2 className="text-red-600" />,
        title: "Une erreur est survenue.",
        description: "Veuillez réessayer plus tard.",
      });
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-xl">
      <PostLayout user={user}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea {...register("content")} />
          {/* BOUTON DE SOUMISSION */}
          <Button
            variant="blue"
            className="mt-3 w-full"
            type="submit"
            disabled={isSubmitting}
          >
            Publier
          </Button>
        </form>
      </PostLayout>
    </div>
  );
};
