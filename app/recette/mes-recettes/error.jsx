"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Error() {
  return (
    <div className="mt-14 flex w-full flex-col items-center justify-center px-4">
      <div className="mx-auto w-full max-w-lg overflow-auto">
        <Alert variant="destructive">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Connectez vous pour voir vos recettes.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
