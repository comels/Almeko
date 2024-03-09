"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import RecipeSchema from "../../lib/recipeSchema";
import IngredientField from "./IngredientField";
import InstructionField from "./InstructionField";

import { createRecipe, updateRecipe } from "@/app/actions/recipeActions";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";

export const categories = [
  { value: "aperos", label: "Apéros" },
  { value: "entree", label: "Entrées" },
  { value: "plat", label: "Plats" },
  { value: "dessert", label: "Desserts" },
  { value: "cocktail", label: "Cocktails" },
];

const FormRecipe = ({ currentUser, recipe }) => {
  const router = useRouter();
  const {
    register,
    watch,
    control,
    handleSubmit, // This function is used to submit the form and prevent the default behavior of the browser
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      author: currentUser,
      name: recipe ? recipe.name : "",
      ingredients: recipe
        ? recipe.ingredients
        : [{ name: "", quantity: "", measure: "" }],
      instructions: recipe ? recipe.instructions : [{ content: "" }],
      category: recipe ? recipe.category : "",
      withoutAlcool: recipe ? recipe.withoutAlcool : false,
      vegetarian: recipe ? recipe.vegetarian : false,
      servings: recipe ? recipe.servings : 1,
    },
  });

  const {
    fields: ingredientsFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionsFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const { toast } = useToast();

  const watchedIngredients = watch("ingredients");
  const watchedName = watch("name");
  const watchedInstructions = watch("instructions");
  const watchedCategory = watch("category");
  const watchedWithoutAlcool = watch("withoutAlcool");
  const watchedVegetarian = watch("vegetarian");
  const watchedServings = watch("servings");

  const onSubmit = async (data) => {
    console.log(data);

    try {
      if (recipe) {
        // Si `recipe` existe, on met à jour la recette
        await updateRecipe(recipe.id, data);
        toast({
          icon: <CheckCircle2 className="text-green-600" />,
          title: "Votre recette a été mise à jour avec succès.",
          description: "Merci !",
        });
      } else {
        // Sinon, on crée une nouvelle recette
        await createRecipe(data);
        toast({
          icon: <CheckCircle2 className="text-green-600" />,
          title: "Votre recette a bien été ajoutée.",
          description: "Merci !",
        });
      }
      router.refresh();
      reset();
      router.push(`/recette/${recipe ? recipe.id : "mes-recettes"}`);
    } catch (error) {
      toast({
        icon: <CheckCircle2 className="text-red-600" />,
        title: "Une erreur est survenue.",
        description: "Veuillez réessayer.",
      });
      console.log(error);
    }
  };

  return (
    // FORMULAIRE
    <div className="mt-5 flex flex-col justify-between gap-10 text-gray-800 lg:flex-row">
      <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
        {/* NOM DE LA RECETTE */}
        <div className="mb-5 sm:mb-10">
          <h1 className="mb-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            Nom de la recette
          </h1>
          <Input
            className={`mb-2 placeholder:font-light ${errors.name ? "border-red-500" : ""}`}
            type="text"
            placeholder="Nom de la recette *"
            {...register("name")}
          />
          {errors.name && (
            <p className="mb-3 ml-3 text-sm font-light text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
        {/* CATEGORIE DE LA RECETTE */}
        <div className="sm:mb:10 mb-5">
          <h1 className="mb-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            Catégorie
          </h1>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field} // Utilise les props du field, incluant onChange et value
                onValueChange={(value) => {
                  field.onChange(value); // Met à jour la valeur du champ dans react-hook-form
                }}
                value={field.value} // Assure que la valeur sélectionnée est la valeur actuelle du champ
              >
                <SelectTrigger className="mb-2">
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                        selected={(field.value = category.value)}
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="mb-3 ml-3 text-sm font-light text-red-500">
              {errors.category.message}
            </p>
          )}
          {/* CHECKBOX ALCOOL */}
          {watchedCategory === "cocktail" && (
            <div>
              <Controller
                name="withoutAlcool"
                control={control}
                render={({ field }) => (
                  <div className="ml-2 mt-4 flex items-center gap-2">
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label htmlFor="terms" className="font-medium">
                      Sans alcool
                    </label>
                  </div>
                )}
              />
            </div>
          )}
          {/* CHECKBOX VEGETARIEN */}
          {["aperos", "entree", "plat"].includes(watchedCategory) && (
            <div>
              <Controller
                name="vegetarian"
                control={control}
                render={({ field }) => (
                  <div className="ml-2 mt-4 flex items-center gap-2">
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label htmlFor="terms" className="font-medium">
                      Végétarien
                    </label>
                  </div>
                )}
              />
            </div>
          )}
        </div>
        {/* NOMBRE DE PERSONNES */}
        <div className="mb-5 sm:mb-10">
          <h1 className="mb-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            Nombre de personnes
          </h1>
          <Input
            className="mb-2"
            min="1"
            type="number"
            placeholder="Nombre de personnes"
            {...register("servings", { valueAsNumber: true })}
          />
        </div>
        {/* LISTE DES INGREDIENTS */}
        <div className="mb-5 sm:mb-10">
          <h1 className="mb-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            Ingrédients
          </h1>
          {ingredientsFields.map((field, index) => (
            <div key={field.id}>
              <IngredientField
                register={register}
                errors={errors}
                index={index}
                removeIngredient={() => removeIngredient(index)}
              />
              {errors.ingredients && errors.ingredients[index]?.quantity && (
                <p className="mb-3 ml-3 text-sm font-light text-red-500">
                  {errors.ingredients[index].quantity.message}
                </p>
              )}
            </div>
          ))}
          {errors.ingredients?.root && (
            <p className="mb-3 ml-3 text-sm font-light text-red-500">
              {errors.ingredients.root.message}
            </p>
          )}

          <Button
            size="sm"
            variant="outlineblue"
            type="button"
            onClick={() =>
              appendIngredient({ name: "", quantity: "", measure: "" })
            }
          >
            Ajouter un ingrédient
          </Button>
        </div>
        {/* LISTE DES INSTRUCTIONS */}
        <div className="mb-5 sm:mb-10">
          <h1 className="mb-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            Instructions
          </h1>
          {instructionsFields.map((field, index) => (
            <InstructionField
              key={field.id}
              register={register}
              errors={errors}
              index={index}
              removeInstruction={() => removeInstruction(index)}
            />
          ))}
          {errors.instructions?.root && (
            <p className="mb-3 ml-3 text-sm font-light text-red-500">
              {errors.instructions.root.message}
            </p>
          )}
          <Button
            size="sm"
            variant="outlineblue"
            type="button"
            onClick={() => appendInstruction({ content: "" })}
          >
            Ajouter une étape
          </Button>
        </div>
        {/* BOUTON DE SOUMISSION */}
        <Button
          variant="blue"
          disabled={isSubmitting}
          className="w-full"
          type="submit"
        >
          {recipe ? "Modifier la recette" : "Ajouter la recette"}
        </Button>
      </form>

      {/* PARTIE DROITE : RECIPE CARD */}
      <div className="flex-1">
        <div className="mx-auto flex w-full max-w-xl flex-col rounded-lg border-8 border-myblue bg-white pb-10">
          {/* HEADER DE LA RECETTE */}
          <div className="mx-10 my-4">
            <div className="mb-5 flex flex-col items-center justify-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {watchedName}
              </h1>
              {currentUser && (
                <p className="text-xs font-bold text-myblue">
                  {currentUser.name}
                </p>
              )}
            </div>
            <div className="flex items-center justify-center gap-2">
              {watchedCategory && (
                <Badge variant="secondary">
                  {
                    categories.find(
                      (category) => category.value === watchedCategory,
                    )?.label
                  }
                </Badge>
              )}
              {watchedVegetarian &&
                ["aperos", "entree", "plat"].includes(watchedCategory) && (
                  <Badge variant="secondary">Végétarien</Badge>
                )}
              {watchedWithoutAlcool && watchedCategory === "cocktail" && (
                <Badge variant="secondary">Sans alcool</Badge>
              )}

              <Badge variant="secondary">{watchedServings}. pax</Badge>
            </div>
          </div>
          {/* INGREDIENTS */}
          <div className="mx-10 my-5">
            <h1 className="mb-5 text-xl font-extrabold tracking-tight sm:text-2xl">
              Ingrédients
            </h1>
            <div>
              {watchedIngredients.map((ingredient, index) => (
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
              {watchedInstructions.map((instruction, index) => (
                <div key={index} className="mb-2 flex gap-2">
                  {watchedInstructions.length > 0 && (
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
        </div>
      </div>
    </div>
  );
};

export default FormRecipe;
