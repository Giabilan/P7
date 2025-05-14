export const RecipeHeader = (recipes) => {
  const selectedTags = {
    ingredients: [],
    appliances: [],
    ustensils: [],
  };

  const getUniqueOptions = (type) => {
    const options = new Set();
    recipes.forEach((recipe) => {
      if (type === "ingredients") {
        recipe.ingredients.forEach((ingredient) => {
          options.add(ingredient.ingredient);
        });
      } else if (type === "appliances") {
        options.add(recipe.appliance);
      } else if (type === "ustensils") {
        recipe.ustensils.forEach((ustensil) => {
          options.add(ustensil);
        });
      }
    });
    return options;
  };

  const getFilteredRecipes = () => {
    return recipes.filter((recipe) => {
      const hasIngredients = selectedTags.ingredients.every((tag) =>
        recipe.ingredients.some((ingredient) => ingredient.ingredient === tag)
      );
      const hasAppliance =
        selectedTags.appliances.length === 0 ||
        selectedTags.appliances.includes(recipe.appliance);
      const hasUstensils = selectedTags.ustensils.every((tag) =>
        recipe.ustensils.includes(tag)
      );
      return hasIngredients && hasAppliance && hasUstensils;
    });
  };

  const updateRecipeCount = () => {
    const recipeCount = document.querySelector(".recipe-count");
    const filteredRecipes = getFilteredRecipes();
    recipeCount.textContent = `${filteredRecipes.length} recettes`;
  };

  const removeTag = (type, value) => {
    selectedTags[type] = selectedTags[type].filter((tag) => tag !== value);
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
    if (!selectedTags[type].includes(value)) {
      selectedTags[type].push(value);
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

    // Fermer le dropdown quand on clique ailleurs
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
