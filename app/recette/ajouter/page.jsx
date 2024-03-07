import { getCurrentUser } from "../../actions/getCurrentUser";
import FormRecipe from "@/components/formRecipe/Form";

export const AddRecipe = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="mx-10 mt-14 sm:mx-20">
      <FormRecipe currentUser={currentUser} />
    </div>
  );
};

export default AddRecipe;
