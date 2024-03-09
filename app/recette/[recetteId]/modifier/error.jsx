"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Error() {
  return (
    <div class="mx-auto mt-14 flex max-w-xl flex-col justify-center">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Vous ne pouvez pas modifier les recettes des autres.
        </AlertDescription>
        <AlertDescription>
          Si c&aposest votre recette, assurez-vous d&aposêtre connecté.
        </AlertDescription>
      </Alert>
    </div>
  );
}
