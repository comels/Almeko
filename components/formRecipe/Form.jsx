"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import IngredientField from "./IngredientField";
import InstructionField from "./InstructionField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const RecipeSchema = z.object({
  name: z
    .string()
    .min(3, "Le nom de la recette doit faire au moins 3 caractères."),
  category: z.string(),
  ingredients: z.array(
    z.object({
      name: z
        .string()
        .min(3, "Le nom de l'ingrédient doit faire au moins 3 caractères."),
      quantity: z.string(),
      measure: z.string(),
    })
  ),
  instructions: z.array(
    z.object({
      name: z
        .string()
        .min(3, "L'instruction doit faire au moins 5 caractères."),
    })
  ),
});

const FormRecipe = () => {
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
      ingredients: [
        {
          name: "",
          quantity: "",
          measure: "",
        },
      ],
      instructions: [
        {
          name: "",
        },
      ],
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

  const categories = [
    { name: "Apéros", value: "aperos" },
    { name: "Entrée", value: "entree" },
    { name: "Plat", value: "plat" },
    { name: "Dessert", value: "dessert" },
    { name: "Cocktail", value: "cocktail" },
  ];
  const watchedIngredients = watch("ingredients");
  const watchedInstructions = watch("instructions");

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    reset();
  };

  return (
    // FORMULAIRE
    <div className="mt-5 flex lg:flex-row flex-col gap-10 justify-between">
      <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
        {/* NOM DE LA RECETTE */}
        <div className="mb-5 sm:mb-10">
          <h1 className="font-extrabold mb-2 tracking-tight text-xl sm:text-2xl">
            Nom de la recette
          </h1>
          <Input
            className={`mb-2 placeholder:font-light ${errors.name ? "border-red-500" : ""}`}
            type="text"
            placeholder="Nom de la recette *"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm ml-3 mb-3 font-light text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
        {/* CATEGORIE DE LA RECETTE */}
        <div className="mb-5 sm:mb:10">
          <h1 className="font-extrabold mb-2 tracking-tight text-xl sm:text-2xl">
            Catégorie
          </h1>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select {...field} onChange={(value) => field.onChange(value)}>
                <SelectTrigger className="mb-2">
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category, index) => (
                      <SelectItem
                        key={index}
                        value={category.value}
                        onClick={() => field.onChange(category.value)} // Mettre à jour la valeur du formulaire
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        {/* LISTE DES INGREDIENTS */}
        <div className="mb-5 sm:mb-10">
          <h1 className="font-extrabold mb-2 tracking-tight text-xl sm:text-2xl">
            Ingrédients
          </h1>
          {ingredientsFields.map((field, index) => (
            <IngredientField
              key={field.id}
              register={register}
              errors={errors}
              index={index}
              removeIngredient={() => removeIngredient(index)}
            />
          ))}
          <Button
            size="sm"
            variant="outline"
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
          <h1 className="font-extrabold mb-2 tracking-tight text-xl sm:text-2xl">
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
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => appendInstruction({ name: "" })}
          >
            Ajouter une instruction
          </Button>
        </div>
        {/* BOUTON DE SOUMISSION */}
        <Button
          variant="kaki"
          disabled={isSubmitting}
          className=""
          type="submit"
        >
          Ajouter la recette
        </Button>
      </form>

      {/* PARTIE DROITE : RECIPE CARD */}
      <div className="flex-1">
        <div className="w-full max-w-xl mx-auto flex flex-col pb-10 bg-white rounded-lg shadow-lg">
          {/* INGREDIENTS */}
          <div className="mx-10 my-2">
            <h1 className="font-extrabold mb-2 tracking-tight text-xl sm:text-2xl">
              Ingrédients
            </h1>
            <div>
              {watchedIngredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <p>
                    {ingredient.quantity}
                    {ingredient.measure && " "}
                    {ingredient.measure}
                  </p>

                  <p>{ingredient.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="mx-10">
            <h1 className="font-extrabold mb-5 tracking-tight text-xl sm:text-2xl">
              Instructions
            </h1>
            <div>
              {watchedInstructions.map((ingredient, index) => (
                <div key={index} className="flex mb-5 gap-2">
                  {watchedInstructions.length > 0 && (
                    <p className="font-extrabold">{index + 1}.</p>
                  )}
                  <p className="text-start">{ingredient.name}</p>
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
