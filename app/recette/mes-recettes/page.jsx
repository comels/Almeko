"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CardRecipe from "@/components/CardRecipe";

const MyRecipes = () => {
  const [myrecipes, setMyRecipes] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getUserRecipes",
        );
        setMyRecipes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes :", error);
      }
    };

    fetchRecipes();
  }, []);

  if (!myrecipes) return <div className="mt-14">Chargement...</div>;

  return <CardRecipe myrecipes={myrecipes} />;
};

export default MyRecipes;
