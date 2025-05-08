import {
  createRecipesContainer,
  updateRecipesList,
} from "./templates/recipeList.js";
import { recipes } from "./recipes.js";

// Fonction principale d'initialisation de l'application
const initApp = () => {
  // Création du conteneur de recettes
  const recipesList = createRecipesContainer();

  // Ajout du conteneur au DOM
  const main = document.querySelector("main");
  if (main) {
    main.appendChild(recipesList);
  }

  // Affichage initial des recettes
  updateRecipesList(recipesList, recipes);
};

initApp();
