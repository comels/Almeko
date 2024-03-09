import CategoryMenu from "@/components/header/CategoryMenu";
import { getCurrentUser } from "../actions/userActions";

export const Home = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <CategoryMenu />
    </div>
  );
};

export default Home;
