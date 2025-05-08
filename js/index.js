import {
  createRecipesContainer,
  updateRecipesList,
} from "./templates/recipeList.js";
import { recipes } from "./recipes.js";
import { initializeSearch } from "./search.js";

// Créer le conteneur des recettes
const main = document.querySelector("main");
const recipesContainer = createRecipesContainer();
main.appendChild(recipesContainer);

// Afficher toutes les recettes au chargement
updateRecipesList(recipesContainer, recipes);

// Initialiser la recherche
initializeSearch();
