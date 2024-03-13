import { getCurrentUser } from "@/app/actions/userActions";
import ListRecipes from "@/components/ListRecipe";

const MyRecipes = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  return (
    <div className="mt-14">
      <h1 className="mb-14 text-center text-4xl font-extrabold tracking-tighter">
        Mes recettes
      </h1>
      <div className="mx-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {currentUser.recipes.map((recipe) => (
          <div key={recipe.id}>
            <ListRecipes recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
