// Version fonctionnelle de la recherche
export const functionalSearch = {
  // Fonction pure pour filtrer les recettes
  filterRecipes: (recipes, searchTerm) => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return recipes.filter((recipe) => {
      const searchableText = [
        recipe.name,
        recipe.description,
        ...recipe.ingredients.map((ing) => ing.ingredient),
        ...recipe.ustensils,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  },
};
