import { getComments } from "@/app/actions/commentActions";
import { findRecipeById, recipeFavorite } from "@/app/actions/recipeActions";
import { getCurrentUser, getUserById } from "@/app/actions/userActions";
import CardRecipe from "@/components/CardRecipe";
import { Comment } from "@/components/comments/Comment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { notFound } from "next/navigation";

const Recipe = async ({ params }) => {
  const recipe = await findRecipeById(params.recetteId);
  if (!recipe) return notFound();
  const currentUser = await getCurrentUser();
  const comments = await getComments(recipe?.id);
  const isFavorite = await recipeFavorite(recipe?.id);
  const authorRecipe = await getUserById(recipe?.authorId);

  return (
    <div className="mx-auto mt-14 max-w-2xl">
      <CardRecipe
        currentUser={currentUser}
        recipe={recipe}
        isFavorite={isFavorite}
        authorRecipe={authorRecipe}
      />
      <div className="mx-7 mt-5 max-w-3xl">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1" defaultOpen>
            <AccordionTrigger className="text-lg font-bold tracking-tighter">{`${comments.length} Commentaire${comments.length > 1 ? "s" : ""}`}</AccordionTrigger>
            <AccordionContent>
              <div className="mb-5 divide-y-2 divide-white">
                {comments.map((comment) => (
                  <Comment comment={comment} key={comment.id} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Recipe;
