// Version native de la recherche
export const nativeSearch = {
  // Fonction utilisant des boucles natives
  filterRecipes: (recipes, searchTerm) => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const results = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      let searchableText = recipe.name + " " + recipe.description;

      // Ajouter les ingrédients
      for (let j = 0; j < recipe.ingredients.length; j++) {
        searchableText += " " + recipe.ingredients[j].ingredient;
      }

      // Ajouter les ustensiles
      for (let k = 0; k < recipe.ustensils.length; k++) {
        searchableText += " " + recipe.ustensils[k];
      }

      if (searchableText.toLowerCase().includes(normalizedSearch)) {
        results.push(recipe);
      }
    }

    return results;
  },
};
