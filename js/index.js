import {
  createRecipesContainer,
  updateRecipesList,
} from "./templates/recipeList.js";
import { recipes } from "./recipes.js";
import { initializeSearch } from "./search.js";
import { RecipeHeader } from "./recipeHeader.js";

// Créer le conteneur des recettes
const main = document.querySelector("main");
const recipesContainer = createRecipesContainer();
main.appendChild(recipesContainer);

// Afficher toutes les recettes au chargement
updateRecipesList(recipesContainer, recipes);

// Créer le header des recettes avec les recettes en paramètre
RecipeHeader(recipes);
// Initialiser la recherche
initializeSearch();
