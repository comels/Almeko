import CategoryMenu from "@/components/header/CategoryMenu";
import { getCurrentUser } from "../actions/userActions";
import { Loader } from "@/components/ui/loader";

export const Home = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <CategoryMenu />
    </div>
  );
};

export default Home;
