"use client";

import { updateUser } from "@/app/actions/userActions";
import ProfileSchema from "@/lib/profileSchema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

const FormProfile = ({ currentUser }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: currentUser?.name,
      bio: currentUser?.bio,
      link: currentUser?.link,
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      await updateUser(currentUser.id, data);
      toast({
        icon: <CheckCircle2 className="text-green-600" />,
        title: "Profil mis à jour avec succès!",
        description: "Merci !",
      });
      router.push("/profil");
      router.refresh();
    } catch {
      toast({
        icon: <CheckCircle2 className="text-red-600" />,
        title: "Erreur lors de la mise à jour du profil",
        description: "Veuillez",
      });
    }
  };

  return (
    <div className="mx-10 mt-5 flex justify-center sm:mt-10">
      <div className="w-full max-w-xl px-4">
        <div className="mt-5 flex justify-center text-gray-800">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* NOM */}
            <div className="mb-5 sm:mb-10">
              <h1 className="mb-2 text-xl font-extrabold tracking-tight">
                Nom
              </h1>
              <Input
                className={`mb-2 placeholder:font-light ${errors.name ? "border-red-500" : ""}`}
                type="text"
                placeholder="Nom"
                {...register("name")}
              />
              {errors.name && (
                <p className="mb-3 ml-3 text-sm font-light text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* BIO */}
            <div className="mb-5 sm:mb-10">
              <h1 className="mb-2 text-xl font-extrabold tracking-tight">
                Bio
              </h1>
              <Textarea
                className={`mb-2 min-h-[120px] placeholder:font-light ${errors.bio ? "border-red-500" : ""}`}
                type="text"
                placeholder="Bio"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="mb-3 ml-3 text-sm font-light text-red-500">
                  {errors.bio.message}
                </p>
              )}
            </div>
            {/* LIEN */}
            <div className="mb-5 sm:mb-10">
              <h1 className="mb-2 text-xl font-extrabold tracking-tight">
                Site
              </h1>
              <Input
                className={`mb-2 placeholder:font-light ${errors.link ? "border-red-500" : ""}`}
                type="text"
                placeholder="Site"
                {...register("link")}
              />
              {errors.link && (
                <p className="mb-3 ml-3 text-sm font-light text-red-500">
                  {errors.link.message}
                </p>
              )}
            </div>
            {/* BOUTON DE SOUMISSION */}
            <div className="flex gap-3">
              <Button
                variant="blue"
                disabled={isSubmitting}
                className="w-full"
                type="submit"
              >
                Valider
              </Button>
              <Link
                href="/profil"
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
              >
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormProfile;
