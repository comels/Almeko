"use client";

import { XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const InstructionField = ({ register, errors, index, removeInstruction }) => (
  <div>
    <div className="mb-2 flex gap-x-3">
      <Textarea
        className={`placeholder:font-light ${errors.instructions?.[index]?.content ? "border-red-500" : ""}`}
        type="text"
        placeholder={"Étape " + (index + 1)}
        {...register(`instructions.${index}.content`)}
      />
      <Button
        size="sm"
        variant="ghost"
        type="button"
        onClick={() => removeInstruction(index)}
      >
        <XCircle className="text-color1 h-4 w-4" />
      </Button>
    </div>
    {errors.instructions && errors.instructions[index]?.content && (
      <p className="mb-3 ml-3 text-sm font-light text-red-500">
        {errors.instructions[index].content.message}
      </p>
    )}
  </div>
);

export default InstructionField;
