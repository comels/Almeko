"use client";

import { XCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const IngredientField = ({ register, errors, index, removeIngredient }) => {
  return (
    <div>
      <div className="flex gap-x-3 mb-2">
        <Input
          className={`w-2/5 placeholder:font-light ${errors.ingredients?.[index]?.quantity ? "border-red-500" : ""}`}
          type="text"
          placeholder="10"
          {...register(`ingredients.${index}.quantity`)}
        />
        <Input
          className="w-1/3 placeholder:font-light"
          type="text"
          placeholder="g"
          {...register(`ingredients.${index}.measure`)}
        />
        <Input
          className={`placeholder:font-light ${errors.ingredients?.[index]?.name ? "border-red-500" : ""}`}
          type="text"
          placeholder="Nom *"
          {...register(`ingredients.${index}.name`)}
        />
        <Button
          size="sm"
          variant="ghost"
          type="button"
          onClick={() => removeIngredient(index)}
        >
          <XCircle className="h-4 w-4 text-myblue" />
        </Button>
      </div>
      {errors.ingredients && errors.ingredients[index]?.name && (
        <p className="text-sm ml-3 mb-3 font-light text-red-500">
          {errors.ingredients[index].name.message}
        </p>
      )}
    </div>
  );
};

export default IngredientField;
