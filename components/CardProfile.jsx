"use client";

import { updateUser } from "@/app/actions/userActions";
import ProfileSchema from "@/lib/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ListRecipes from "./ListRecipe";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

export const CardProfile = ({ currentUser }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
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
  const removeHTTP = (url) => {
    return url.replace(/(^\w+:|^)\/\//, "");
  };

  return (
    <div>
      {currentUser ? (
        <div className="mx-auto mt-14 w-full max-w-2xl">
          <div className="flex flex-col items-center pb-10">
            <Image
              src={currentUser.image}
              alt={currentUser.name}
              width={240}
              height={240}
              priority={true}
              className="border-color1 mb-5 rounded-full border-[20px] p-2"
            />
            <h5 className="mb-3 text-xl font-extrabold tracking-tight sm:text-2xl">
              {currentUser.name}
            </h5>

            {currentUser.bio && (
              <p className="mb-3 max-w-lg text-center text-base italic text-gray-600">
                {currentUser.bio}
              </p>
            )}
            {currentUser.link && (
              <a
                href={currentUser.link}
                target="_blank"
                rel="noreferrer"
                className="text-color1 mb-3 text-sm"
              >
                {removeHTTP(currentUser.link)}
              </a>
            )}
            <div>
              {/* Sheet pour modifier le profil */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Modifier le profil</Button>
                </SheetTrigger>
                <SheetContent action={reset}>
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    {/* NOM */}
                    <div className="my-10">
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
                    <div className="mb-10">
                      <h1 className="mb-2 text-xl font-extrabold tracking-tight">
                        Bio
                      </h1>
                      <Textarea
                        className={`mb-2 min-h-[200px] resize-none placeholder:font-light ${errors.bio ? "border-red-500" : ""}`}
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
                    <div className="mb-10">
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
                    <SheetClose asChild>
                      <div className="flex flex-col gap-3">
                        <Button
                          size="sm"
                          variant="blue"
                          disabled={isSubmitting}
                          className="w-full"
                          type="submit"
                        >
                          Valider
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          type="button"
                          onClick={() => reset()}
                        >
                          Annuler les modifications
                        </Button>
                      </div>
                    </SheetClose>
                  </form>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      ) : null}
      <div className="mx-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {currentUser.recipes.map((recipe) => (
          <div key={recipe.id}>
            <ListRecipes recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};
