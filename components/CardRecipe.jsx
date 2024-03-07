"use client";

import axios from "axios";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const MyRecipes = ({ myrecipes }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("/api/recipes", { data: { id } });
      console.log("Suppression réussie, réponse :", response);
      toast({
        icon: <CheckCircle2 className="text-green-600" />,
        title: "Votre recette a bien été supprimée.",
        description: "Merci !",
      });
      // Utiliser setTimeout pour s'assurer que le toast a le temps de s'afficher avant de recharger
      setTimeout(() => {
        router.push("/");
      }, 1000); // Ajustez le délai au besoin
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast({
        icon: <CheckCircle2 className="text-red-600" />,
        title: "Une erreur est survenue.",
        description: "Veuillez réessayer.",
      });
    }
  };

  return (
    <div className="mt-14">
      <h1 className="mb-5 text-center text-4xl font-extrabold tracking-tighter">
        Mes recettes
      </h1>
      <div className="mx-5 grid grid-cols-2 gap-5 lg:grid-cols-3">
        {myrecipes.map((recipe) => (
          <div key={recipe.id}>
            <div className="m-auto flex max-w-xl flex-col rounded-lg border-8 border-myblue bg-white pb-10">
              {/* HEADER DE LA RECETTE */}
              <div className="mx-10 my-4">
                <div className="mb-5 flex items-center justify-center gap-3">
                  <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {recipe.name}
                  </h1>
                </div>
                <div className="flex items-center justify-center gap-2">
                  {recipe.vegetarian &&
                    ["aperos", "entree", "plat"].includes(recipe.category) && (
                      <Badge variant="secondary">Végétarien</Badge>
                    )}
                  {recipe.withoutAlcool && recipe.category === "cocktail" && (
                    <Badge variant="secondary">Sans alcool</Badge>
                  )}
                  <Badge variant="secondary">{recipe.servings}. pax</Badge>
                </div>
              </div>
              {/* INGREDIENTS */}
              <div className="mx-10 my-5">
                <h1 className="mb-5 text-xl font-extrabold tracking-tight sm:text-2xl">
                  Ingrédients
                </h1>
                <div>
                  {recipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="mb-1 flex items-center gap-3 text-neutral-800"
                    >
                      {ingredient.quantity && (
                        <div className="flex gap-1">
                          {ingredient.quantity && <p>{ingredient.quantity}</p>}
                          {ingredient.measure && <p>{ingredient.measure}</p>}
                        </div>
                      )}

                      <p>{ingredient.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* INSTRUCTIONS */}
              <div className="mx-10">
                <h1 className="mb-5 text-xl font-extrabold tracking-tight sm:text-2xl">
                  Préparation
                </h1>
                <div>
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="mb-2 flex gap-2">
                      {recipe.instructions.length > 0 && (
                        <div className="font-bold">
                          {index + 1}
                          {"."}
                        </div>
                      )}
                      <p className="text-start text-neutral-900">
                        {instruction.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-5">
                <Button>Modifier</Button>
                <Button
                  onClick={() => {
                    handleDelete(recipe.id);
                  }}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
