"use client";

import { createComment } from "@/app/actions/commentActions";
import { Button } from "@/components/ui/button";
import CommentSchema from "@/lib/commentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { PostLayout } from "./PostLayout";

export const WriteForm = ({ currentUser, recipe }) => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit, // This function is used to submit the form and prevent the default behavior of the browser
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      authorId: currentUser.id,
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
    <div className="mx-7 mt-5 max-w-4xl">
      <PostLayout user={currentUser}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea {...register("content")} />
          {/* BOUTON DE SOUMISSION */}
          <Button
            variant="blue"
            className="mt-3 w-full"
            type="submit"
            size="sm"
            disabled={isSubmitting}
          >
            Publier
          </Button>
        </form>
      </PostLayout>
    </div>
  );
};
