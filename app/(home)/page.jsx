import CategoryMenu from "@/components/header/CategoryMenu";
import { getCurrentUser } from "../actions/userActions";
import Footer from "@/components/Footer";

export const Home = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <CategoryMenu />
      <Footer />
    </div>
  );
};

export default Home;
