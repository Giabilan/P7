export function createRecipeCard(recipe) {
  const card = document.createElement("article");
  card.className = "recipe-card";

  // Création de l'image
  const img = document.createElement("img");
  img.src = recipe.image;
  img.alt = recipe.name;
  img.className = "recipe-image";

  // Création du conteneur de temps
  const timeContainer = document.createElement("div");
  timeContainer.className = "recipe-time";
  timeContainer.innerHTML = `
          <i class="far fa-clock"></i>
          <span>${recipe.time}min</span>
      `;

  // Création du contenu de la recette
  const content = document.createElement("div");
  content.className = "recipe-content";

  // Titre de la recette
  const title = document.createElement("h2");
  title.className = "recipe-title";
  title.textContent = recipe.name;

  // Section de la recette
  const recipeSection = document.createElement("div");
  recipeSection.className = "recipe-section";

  // Titre "Recette"
  const recipeTitle = document.createElement("h3");
  recipeTitle.textContent = "Recette";

  // Description
  const description = document.createElement("p");
  description.className = "recipe-description";
  description.textContent = recipe.description;

  // Section des ingrédients
  const ingredientsSection = document.createElement("div");
  ingredientsSection.className = "recipe-section";

  // Titre "Ingrédients"
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Ingrédients";

  // Liste des ingrédients
  const ingredientsList = document.createElement("div");
  ingredientsList.className = "ingredients-list";

  recipe.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("div");
    ingredientItem.className = "ingredient-item";

    const ingredientName = document.createElement("span");
    ingredientName.className = "ingredient-name";
    ingredientName.textContent = ingredient.ingredient;

    const ingredientQuantity = document.createElement("span");
    ingredientQuantity.className = "ingredient-quantity";
    ingredientQuantity.textContent = ingredient.quantity
      ? `${ingredient.quantity} ${ingredient.unit || ""}`
      : "";

    ingredientItem.appendChild(ingredientName);
    ingredientItem.appendChild(ingredientQuantity);
    ingredientsList.appendChild(ingredientItem);
  });

  // Assemblage des sections
  recipeSection.appendChild(recipeTitle);
  recipeSection.appendChild(description);

  ingredientsSection.appendChild(ingredientsTitle);
  ingredientsSection.appendChild(ingredientsList);

  content.appendChild(title);
  content.appendChild(recipeSection);
  content.appendChild(ingredientsSection);

  // Assemblage final de la carte
  card.appendChild(img);
  card.appendChild(timeContainer);
  card.appendChild(content);

  return card;
}
