import { getCurrentUser, getUserById } from "@/app/actions/userActions";
import ListRecipes from "@/components/ListRecipe";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

const User = async ({ params }) => {
  const user = await getUserById(params.userId);
  if (!user) {
    return notFound();
  }

  const currentUser = await getCurrentUser();
  if (currentUser?.id === user.id) {
    redirect("/profil");
  }

  // Fonction pour supprimer le protocole HTTP d'une URL
  const removeHTTP = (url) => {
    return url.replace(/(^\w+:|^)\/\//, "");
  };

  return (
    <div>
      {user ? (
        <div className="mx-auto mt-14 w-full max-w-2xl bg-white">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <Image
              src={user.image}
              alt={user.name}
              width={240}
              height={240}
              priority={true}
              className="border-color1 mb-5 rounded-full border-[20px] p-2"
            />
            <h5 className="mb-3 text-xl font-extrabold tracking-tight sm:text-2xl">
              {user.name}
            </h5>

            {user.bio && (
              <p className="mb-3 max-w-lg text-center text-base italic text-gray-600">
                {user.bio}
              </p>
            )}
            {user.link && (
              <a
                href={user.link}
                target="_blank"
                rel="noreferrer"
                className="text-color1 mb-3 text-sm"
              >
                {removeHTTP(user.link)}
              </a>
            )}
            <div></div>
          </div>
        </div>
      ) : null}
      <div className="mx-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {user.recipes.map((recipe) => (
          <div key={recipe.id}>
            <ListRecipes recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
