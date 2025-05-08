import { createRecipeCard } from "./recipeCard.js";

export function createRecipesContainer() {
  const container = document.createElement("section");
  container.className = "recipes-container";
  container.id = "recipes-list";
  return container;
}

export function updateRecipesList(container, recipes) {
  // Vider le conteneur
  container.innerHTML = "";

  if (recipes.length === 0) {
    const noResults = document.createElement("p");
    noResults.className = "no-results";
    noResults.textContent = "Aucune recette ne correspond à votre critère...";
    container.appendChild(noResults);
    return;
  }

  // Créer et ajouter les cartes de recettes
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    container.appendChild(card);
  });
}
