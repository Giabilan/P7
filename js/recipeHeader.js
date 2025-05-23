import { updateRecipesList } from "./templates/recipeList.js";
import { recipeService } from "./services/recipeService.js";

export const RecipeHeader = (recipes) => {
  const getUniqueOptions = (type) => {
    const options = new Set();
    recipes.forEach((recipe) => {
      if (type === "ingredients") {
        recipe.ingredients.forEach((ingredient) => {
          options.add(ingredient.ingredient.toLowerCase());
        });
      } else if (type === "appliances") {
        options.add(recipe.appliance.toLowerCase());
      } else if (type === "ustensils") {
        recipe.ustensils.forEach((ustensil) => {
          options.add(ustensil.toLowerCase());
        });
      }
    });
    return options;
  };

  const updateRecipeCount = () => {
    const filteredRecipes = recipeService.filterRecipes();
    const recipeCount = document.querySelector(".recipe-count");
    recipeCount.textContent = `${filteredRecipes.length} recettes`;

    // Mettre à jour la liste des recettes
    const recipesContainer = document.getElementById("recipes-list");
    if (recipesContainer) {
      updateRecipesList(recipesContainer, filteredRecipes);
    }
  };

  const removeTag = (type, value) => {
    const tags = recipeService.getSelectedTags();
    tags[type] = tags[type].filter((tag) => tag !== value);
    recipeService.setSelectedTags(tags);
  };

  const createTag = (type, value) => {
    const tagsContainer = document.querySelector(".tags-container");
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.innerHTML = `
      <span>${value}</span>
      <button class="close-tag">&times;</button>
    `;
    tag.querySelector(".close-tag").addEventListener("click", () => {
      removeTag(type, value);
      tag.remove();
      updateRecipeCount();
    });
    tagsContainer.appendChild(tag);
  };

  const addTag = (type, value) => {
    const tags = recipeService.getSelectedTags();
    if (!tags[type].includes(value.toLowerCase())) {
      tags[type].push(value.toLowerCase());
      recipeService.setSelectedTags(tags);
      createTag(type, value);
      updateRecipeCount();
    }
  };

  const createDropdown = (type, label) => {
    const dropdownContainer = document.createElement("div");
    dropdownContainer.className = "dropdown";

    const dropdownButton = document.createElement("button");
    dropdownButton.className = "dropdown-button";
    dropdownButton.textContent = label;
    dropdownContainer.appendChild(dropdownButton);

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown-content";
    dropdownContainer.appendChild(dropdownContent);

    const options = getUniqueOptions(type);
    options.forEach((option) => {
      const optionElement = document.createElement("div");
      optionElement.className = "dropdown-option";
      optionElement.textContent = option;
      optionElement.addEventListener("click", () => {
        addTag(type, option);
        dropdownContent.classList.remove("show");
      });
      dropdownContent.appendChild(optionElement);
    });

    dropdownButton.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownContent.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!dropdownContainer.contains(e.target)) {
        dropdownContent.classList.remove("show");
      }
    });

    return dropdownContainer;
  };

  // Création du header
  const header = document.createElement("div");
  header.className = "recipe-header";

  // Partie gauche (dropdowns + tags)
  const left = document.createElement("div");
  left.className = "recipe-header-left";

  const dropdownsContainer = document.createElement("div");
  dropdownsContainer.className = "dropdowns-container";
  dropdownsContainer.appendChild(createDropdown("ingredients", "Ingrédients"));
  dropdownsContainer.appendChild(createDropdown("appliances", "Appareils"));
  dropdownsContainer.appendChild(createDropdown("ustensils", "Ustensiles"));
  left.appendChild(dropdownsContainer);

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "tags-container";
  left.appendChild(tagsContainer);

  // Partie droite (compteur)
  const recipeCount = document.createElement("div");
  recipeCount.className = "recipe-count";
  header.appendChild(left);
  header.appendChild(recipeCount);

  // Insérer le header au début du main
  const main = document.querySelector("main");
  main.insertBefore(header, main.firstChild);

  updateRecipeCount();
};
