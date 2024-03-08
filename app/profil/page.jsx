import { CardProfile } from "@/components/CardProfile";
import { getCurrentUser } from "../actions/userActions";
import Footer from "@/components/Footer";

export const Profil = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <CardProfile currentUser={currentUser} />
    </div>
  );
};

export default Profil;
