"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
          Si c'est votre recette, assurez-vous d'être connecté.
        </AlertDescription>
      </Alert>
    </div>
  );
}
