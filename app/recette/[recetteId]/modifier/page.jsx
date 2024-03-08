import { findRecipeById } from "@/app/actions/recipeActions";
import { getCurrentUser } from "@/app/actions/userActions";
import FormRecipe from "@/components/formRecipe/FormRecipe";

const UpdateRecipe = async ({ params }) => {
  const currentUser = await getCurrentUser();
  const recipe = await findRecipeById(params.recetteId);

  return (
    <div className="mx-10 mt-14 sm:mx-20">
      <FormRecipe currentUser={currentUser} recipe={recipe} />
    </div>
  );
};

export default UpdateRecipe;
