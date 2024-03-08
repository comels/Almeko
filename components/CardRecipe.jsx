"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteRecipe } from "@/app/actions/recipeActions";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import Link from "next/link";

const CardRecipe = ({ recipe, user }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const [servings, setServings] = useState(recipe.servings);
  const [ingredients, setIngredients] = useState(recipe.ingredients);

  // Fonction pour formater les nombres
  const formatQuantity = (quantity) => {
    const number = parseFloat(quantity);
    if (Number.isInteger(number)) {
      return number.toString(); // Retourne le nombre sans décimales si c'est un entier
    } else {
      return number.toFixed(1); // Retourne le nombre avec une décimale si c'est un flottant
    }
  };

  // Ajuster les quantités d'ingrédients
  const adjustIngredientQuantities = (newServings) => {
    const adjustedIngredients = recipe.ingredients.map((ingredient) => {
      const originalQuantity = parseFloat(ingredient.quantity) || 0;
      const originalServings = recipe.servings;
      const newQuantity = (originalQuantity / originalServings) * newServings;
      return {
        ...ingredient,
        quantity: formatQuantity(newQuantity), // Arrondir à 2 décimales
      };
    });
    setIngredients(adjustedIngredients);
  };

  // Fonctions pour augmenter nombre de parts
  const increaseServings = () => {
    const newServings = servings + 1;
    setServings(newServings);
    adjustIngredientQuantities(newServings);
  };

  // Fonctions pour diminuer nombre de parts
  const decreaseServings = () => {
    const newServings = servings > 1 ? servings - 1 : 1;
    setServings(newServings);
    adjustIngredientQuantities(newServings);
  };

  // Fonction pour supprimer une recette
  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await deleteRecipe(id);
      toast({
        icon: <CheckCircle2 className="text-green-600" />,
        title: "Votre recette a bien été supprimée.",
        description: "Merci !",
      });
      router.push("/recette/mes-recettes");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast({
        icon: <CheckCircle2 className="text-red-600" />,
        title: "Une erreur est survenue.",
        description: "Veuillez réessayer.",
      });
    }
    setIsDeleting(false);
  };

  return (
    <div key={recipe.id}>
      <div className="m-auto flex max-w-xl flex-col rounded-lg border-8 border-myblue bg-white pb-10">
        {/* HEADER DE LA RECETTE */}
        <div className="mx-10 my-4">
          <div className="mb-5 flex items-center justify-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {recipe.name}
            </h1>
          </div>
          <div className="mb-5 flex items-center justify-center gap-2">
            {recipe.vegetarian &&
              ["aperos", "entree", "plat"].includes(recipe.category) && (
                <Badge variant="secondary">Végétarien</Badge>
              )}
            {recipe.withoutAlcool && recipe.category === "cocktail" && (
              <Badge variant="secondary">Sans alcool</Badge>
            )}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button variant="ghost" size="sm" onClick={decreaseServings}>
              <Minus />
            </Button>
            <Badge className="text-lg" variant="secondary">
              {servings} pax
            </Badge>
            <Button variant="ghost" size="sm" onClick={increaseServings}>
              <Plus />
            </Button>
          </div>
        </div>
        {/* INGREDIENTS */}
        <div className="mx-10 my-5">
          <h1 className="mb-5 text-xl font-extrabold tracking-tight sm:text-2xl">
            Ingrédients
          </h1>
          <div>
            {ingredients.map((ingredient, index) => (
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
        {user && recipe.authorId === user.id && (
          <div className="mt-10 flex justify-center gap-5">
            {/* Bouton de modification */}
            <Link href={`/recette/${recipe.id}/modifier`}>
              <Button variant="blue" size="sm">
                Modifier
              </Button>
            </Link>
            {/* Bouton de suppression */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="blue" size="sm" disabled={isDeleting}>
                  {isDeleting ? "Suppression..." : "Supprimer"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Êtes-vous sûr de vouloir supprimer cette recette ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDelete(recipe.id);
                    }}
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardRecipe;
