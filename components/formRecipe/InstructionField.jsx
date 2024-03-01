"use client"

import { XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const InstructionField = ({ register, errors, index, removeInstruction }) => (
    <div>
      <div className="flex gap-x-3 mb-2">
        <Textarea
          className={`placeholder:font-light ${errors.instructions?.[index]?.name ? "border-red-500" : ""}`}
          type="text"
          placeholder={"Instruction " + (index + 1)}
          {...register(`instructions.${index}.name`)}
        />
        <Button
          size="sm"
          variant="ghost"
          type="button"
          onClick={() => removeInstruction(index)}
        >
          <XCircle className="h-4 w-4" />
        </Button>
      </div>
      {errors.instructions && errors.instructions[index]?.name && (
        <p className="text-sm ml-3 mb-3 font-light text-red-500">
          {errors.instructions[index].name.message}
        </p>
      )}
    </div>
  );
 
export default InstructionField;