import { createRecipeCard } from "./recipeCard.js";

export function createRecipesContainer() {
  const container = document.createElement("section");
  container.className = "recipes-container";
  container.id = "recipes-list";

  // Créer la div parent pour les tags et le compteur
  const headerContainer = document.createElement("div");
  headerContainer.className = "recipes-header";

  // Ajouter le compteur de recettes
  const recipeCount = document.createElement("div");
  recipeCount.className = "recipe-count";
  headerContainer.appendChild(recipeCount);

  // Ajouter le conteneur pour les tags (à implémenter plus tard)
  const tagsContainer = document.createElement("div");
  tagsContainer.className = "tags-container";
  headerContainer.appendChild(tagsContainer);

  // Ajouter le header au conteneur principal
  container.appendChild(headerContainer);

  // Créer le conteneur pour les cartes de recettes
  const cardsContainer = document.createElement("div");
  cardsContainer.className = "recipes-cards";
  container.appendChild(cardsContainer);

  return container;
}

export function updateRecipesList(container, recipes) {
  // Mettre à jour le compteur de recettes
  const recipeCount = container.querySelector(".recipe-count");
  recipeCount.textContent = `${recipes.length} recettes`;

  // Récupérer le conteneur des cartes
  const cardsContainer = container.querySelector(".recipes-cards");

  // Vider le conteneur des cartes
  cardsContainer.innerHTML = "";

  if (recipes.length === 0) {
    const noResults = document.createElement("p");
    noResults.className = "no-results";
    noResults.textContent = "Aucune recette ne correspond à votre critère...";
    cardsContainer.appendChild(noResults);
    return;
  }

  // Créer et ajouter les cartes de recettes
  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    cardsContainer.appendChild(card);
  });
}
