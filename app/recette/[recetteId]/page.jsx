import { getComments } from "@/app/actions/commentActions";
import { findRecipeById } from "@/app/actions/recipeActions";
import { getCurrentUser } from "@/app/actions/userActions";
import CardRecipe from "@/components/CardRecipe";
import { Comment } from "@/components/comments/Comment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const UpdateRecipe = async ({ params }) => {
  const recipe = await findRecipeById(params.recetteId);
  const currentUser = await getCurrentUser();
  const comments = await getComments(recipe.id);

  return (
    <div className="mt-32">
      <CardRecipe user={currentUser} recipe={recipe} />
      <div className="mx-auto mt-10 max-w-lg">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-bold tracking-tighter">{`${comments.length} Commentaire${comments.length > 1 ? "s" : ""}`}</AccordionTrigger>
            <AccordionContent>
              <div className="mb-5 divide-y-2 divide-muted">
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

export default UpdateRecipe;
