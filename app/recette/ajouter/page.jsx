import { getCurrentUser } from "../../actions/userActions";
import FormRecipe from "@/components/formRecipe/FormRecipe";

export const AddRecipe = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Connectez-vous pour ajouter une recette");
  }

  return (
    <div className="mx-10 mt-14 sm:mx-20">
      <FormRecipe currentUser={currentUser} />
    </div>
  );
};

export default AddRecipe;
