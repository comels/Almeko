import { CardProfile } from "@/components/CardProfile";
import { getCurrentUser, getUserRecipes } from "../actions/userActions";

export const Profil = async () => {
  const currentUser = await getCurrentUser();
  const userRecipes = await getUserRecipes();
  return (
    <div>
      <CardProfile currentUser={currentUser} userRecipes={userRecipes} />
    </div>
  );
};

export default Profil;
