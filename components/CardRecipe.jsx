"use client";

import { addFavorite, deleteRecipe } from "@/app/actions/recipeActions";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  TbHeart,
  TbHeartFilled,
  TbMessageCircle2,
  TbMessageCircle2Filled,
} from "react-icons/tb";
import { WriteForm } from "./comments/WriteForm";
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
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Loader } from "./ui/loader";
import { useToast } from "./ui/use-toast";

const CardRecipe = ({ recipe, currentUser, isFavorite, authorRecipe }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [servings, setServings] = useState(recipe.servings);
  const [ingredients, setIngredients] = useState(
    recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      originalQuantity: parseFloat(ingredient.quantity) || 0, // Ajoutez un champ pour conserver la quantité originale
    })),
  );

  // Ajuster les quantités d'ingrédients basé sur le nombre de servings
  const adjustIngredientQuantities = (newServings) => {
    const adjustedIngredients = ingredients.map((ingredient) => {
      const { originalQuantity } = ingredient; // Utilisez la quantité originale pour le calcul
      if (!originalQuantity) return ingredient;

      // Calculez la nouvelle quantité basée sur le ratio des nouvelles portions par rapport aux portions originales
      const newQuantity = (originalQuantity * newServings) / recipe.servings;
      return {
        ...ingredient,
        quantity:
          newQuantity % 1 === 0
            ? newQuantity.toString()
            : newQuantity.toFixed(2),
      };
    });
    setIngredients(adjustedIngredients);
  };

  const increaseServings = () => {
    setServings((prevServings) => {
      const newServings = prevServings + 1;
      adjustIngredientQuantities(newServings);
      return newServings;
    });
  };

  const decreaseServings = () => {
    setServings((prevServings) => {
      const newServings = prevServings - 1 > 0 ? prevServings - 1 : 1;
      adjustIngredientQuantities(newServings);
      return newServings;
    });
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

  // Fonction pour capitaliser les phrases
  function capitalizeSentences(text) {
    return (
      text
        // Capitalise la première lettre du texte
        .replace(/^[a-z]/, (firstLetter) => firstLetter.toUpperCase())
        // Capitalise les lettres suivant un point et un espace
        .replace(/\. +[a-z]/g, (match) => match.toUpperCase())
    );
  }

  // Fonction pour ajouter ou supprimer les recette des favoris
  const handleFavorite = async (id) => {
    try {
      await addFavorite(id);
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris :", error);
      toast({
        icon: <CheckCircle2 className="text-red-600" />,
        title: "Une erreur est survenue.",
        description: "Veuillez réessayer.",
      });
    }
  };

  return (
    <div>
      <div className="mx-7 flex flex-col rounded-lg border-8 border-myblue bg-white pb-10">
        {/* HEADER DE LA RECETTE */}
        <div className="mx-10 my-4">
          <div className="mb-5 flex flex-col items-center justify-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {recipe.name}
            </h1>
            <p className="text-sm font-bold text-myblue">{authorRecipe.name}</p>
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
          <div className="flex items-center justify-center gap-1">
            <Button variant="ghost" size="sm" onClick={decreaseServings}>
              <Minus size={20} />
            </Button>
            <Badge className="text-sm" variant="secondary">
              {servings} pers.
            </Badge>
            <Button variant="ghost" size="sm" onClick={increaseServings}>
              <Plus size={20} />
            </Button>
          </div>
        </div>
        {/* INGREDIENTS */}
        <div className="mx-5 my-5">
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
        <div className="mx-5">
          <h1 className="mb-5 text-xl font-extrabold tracking-tight sm:text-2xl">
            Préparation
          </h1>
          <div>
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="mb-4 flex flex-col">
                {recipe.instructions.length > 0 && (
                  <div className="font-bold tracking-tight">{`Étape ${index + 1}`}</div>
                )}
                <p className="text-start font-light text-neutral-900">
                  {capitalizeSentences(instruction.content)}
                </p>
              </div>
            ))}
          </div>
        </div>
        {currentUser && recipe.authorId === currentUser.id && (
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
      {/* FORMULAIRE DE COMMENTAIRE */}
      {currentUser && (
        <div>
          <div className="ml-10 mt-5 flex items-center gap-2">
            <Button
              onClick={() => {
                setIsCommenting(!isCommenting);
              }}
              size="sm"
              variant="ghost"
            >
              {isCommenting ? (
                <div className="flex items-center gap-2">
                  <TbMessageCircle2Filled className="h-7 w-7 text-myblue" />
                  <span className="text-base font-light text-myblue">
                    Commenter
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <TbMessageCircle2 className="h-7 w-7 text-myblue" />
                  <span className="text-base font-light text-myblue">
                    Commenter
                  </span>
                </div>
              )}
            </Button>
            <Button
              onClick={() => {
                startTransition(() => {
                  handleFavorite(recipe.id);
                });
              }}
              size="sm"
              variant="ghost"
            >
              {!isFavorite ? (
                <div className="flex items-center gap-2">
                  {isPending ? (
                    <Loader className="h-7 w-7 text-myblue" />
                  ) : (
                    <TbHeart className="h-7 w-7 text-myblue" />
                  )}
                  <span className="text-base font-light text-myblue">
                    Ajouter aux favoris
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isPending ? (
                    <Loader className="h-7 w-7 text-myblue" />
                  ) : (
                    <TbHeartFilled className="h-7 w-7 text-myblue" />
                  )}
                  <span className="text-base font-light text-myblue">
                    Retirer des favoris
                  </span>
                </div>
              )}
            </Button>
          </div>

          {isCommenting && (
            <WriteForm currentUser={currentUser} recipe={recipe} />
          )}
        </div>
      )}
    </div>
  );
};

export default CardRecipe;
