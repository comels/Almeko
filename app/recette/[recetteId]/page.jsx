import { findRecipeById } from "@/app/actions/recipeActions";
import { getCurrentUser } from "@/app/actions/userActions";
import CardRecipe from "@/components/CardRecipe";

const UpdateRecipe = async ({ params }) => {
  const recipe = await findRecipeById(params.recetteId);
  const currentUser = await getCurrentUser();
  return (
    <div className="mt-32">
      <CardRecipe user={currentUser} recipe={recipe} />
    </div>
  );
};

export default UpdateRecipe;
