import { updateRecipesList } from "./templates/recipeList.js";
import { recipeService } from "./services/recipeService.js";

export function initializeSearch() {
  const searchInput = document.querySelector(".search-wrapper input");
  const recipesContainer = document.getElementById("recipes-list");

  searchInput.addEventListener("input", (e) => {
    recipeService.setSearchTerm(e.target.value);
    const filteredRecipes = recipeService.filterRecipes();
    updateRecipesList(recipesContainer, filteredRecipes);

    // Mettre à jour le compteur de recettes
    const recipeCount = document.querySelector(".recipe-count");
    if (recipeCount) {
      recipeCount.textContent = `${filteredRecipes.length} recette${
        filteredRecipes.length > 1 ? "s" : ""
      }`;
    }
  });
}
