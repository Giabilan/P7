import { recipes } from "./recipes.js";
import { updateRecipesList } from "./templates/recipeList.js";

export function initializeSearch() {
  const searchInput = document.querySelector(".search-wrapper input");
  const recipesContainer = document.getElementById("recipes-list");

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredRecipes = filterRecipes(searchTerm);
    updateRecipesList(recipesContainer, filteredRecipes);
  });
}

function filterRecipes(searchTerm) {
  if (!searchTerm) return recipes;

  return recipes.filter((recipe) => {
    // Vérifier le titre
    if (recipe.name.toLowerCase().includes(searchTerm)) return true;

    // Vérifier la description
    if (recipe.description.toLowerCase().includes(searchTerm)) return true;

    // Vérifier les ingrédients
    if (
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchTerm)
      )
    )
      return true;

    return false;
  });
}
