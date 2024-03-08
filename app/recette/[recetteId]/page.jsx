import { findRecipeById } from "@/app/actions/recipeActions";
import CardRecipe from "@/components/CardRecipe";

const UpdateRecipe = async ({ params }) => {
  const recipe = await findRecipeById(params.recetteId);
  return (
    <div className="mt-32">
      <CardRecipe recipe={recipe} />
    </div>
  );
};

export default UpdateRecipe;
