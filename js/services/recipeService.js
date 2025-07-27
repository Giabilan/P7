import { recipes } from "../recipes.js";

class RecipeService {
  constructor() {
    this.currentSearchTerm = "";
    this.selectedTags = {
      ingredients: [],
      appliances: [],
      ustensils: [],
    };
  }

  setSearchTerm(term) {
    this.currentSearchTerm = term.toLowerCase().trim();
  }

  getSearchTerm() {
    return this.currentSearchTerm;
  }

  setSelectedTags(tags) {
    this.selectedTags = tags;
  }

  getSelectedTags() {
    return this.selectedTags;
  }

  filterRecipes() {
    let filteredRecipes = [...recipes];

    // Filtrer par tags
    if (this.selectedTags) {
      filteredRecipes = filteredRecipes.filter((recipe) => {
        const hasIngredients = this.selectedTags.ingredients.every((tag) =>
          recipe.ingredients.some(
            (ingredient) =>
              ingredient.ingredient.toLowerCase() === tag.toLowerCase()
          )
        );

        const hasAppliance =
          this.selectedTags.appliances.length === 0 ||
          this.selectedTags.appliances.some(
            (tag) => recipe.appliance.toLowerCase() === tag.toLowerCase()
          );

        const hasUstensils = this.selectedTags.ustensils.every((tag) =>
          recipe.ustensils.some(
            (ustensil) => ustensil.toLowerCase() === tag.toLowerCase()
          )
        );

        return hasIngredients && hasAppliance && hasUstensils;
      });
    }

    // Filtrer par terme de recherche
    if (this.currentSearchTerm) {
      filteredRecipes = filteredRecipes.filter((recipe) => {
        if (recipe.name.toLowerCase().includes(this.currentSearchTerm))
          return true;
        if (recipe.description.toLowerCase().includes(this.currentSearchTerm))
          return true;
        if (
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(this.currentSearchTerm)
          )
        )
          return true;
        return false;
      });
    }

    return filteredRecipes;
  }
}

export const recipeService = new RecipeService();
