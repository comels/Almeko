import { getCurrentUser, getSession } from "../actions/getCurrentUser";
import FormRecipe from "@/components/formRecipe/Form";

export const Home = async () => {
  const session = await getSession();
  const currentUser = await getCurrentUser();
  return (
    <div>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre> */}
      <FormRecipe />
    </div>
  );
};

export default Home;
