"use client";

import { useParams } from "next/navigation";

const UpdateRecipe = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <h1 className="mt-32">Modifier une recette</h1>
      {params.recetteId}
    </div>
  );
};

export default UpdateRecipe;
