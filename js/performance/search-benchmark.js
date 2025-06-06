import { recipes } from "../recipes.js";
import { functionalSearch } from "./functional-search.js";
import { nativeSearch } from "./native-search.js";

// Données de test
const testData = {
  recipes: recipes,
  searchTerms: [
    // Ingrédients principaux
    "poulet",
    "poisson",
    "thon",
    "légumes",
    "fruits",
    "viande",
    // Légumes spécifiques
    "tomate",
    "carotte",
    "concombre",
    "salade",
    "oignon",
    "poivron",
    // Fruits
    "citron",
    "orange",
    "pomme",
    "fraise",
    "banane",
    // Produits laitiers
    "fromage",
    "lait",
    "crème",
    "beurre",
    "yaourt",
    // Céréales et féculents
    "riz",
    "pâtes",
    "pain",
    "quinoa",
    "semoule",
    // Épices et condiments
    "sel",
    "poivre",
    "sucre",
    "miel",
    "vinaigre",
    // Ustensiles
    "casserole",
    "poêle",
    "mixeur",
    "blender",
    "saladier",
    // Types de plats
    "soupe",
    "salade",
    "dessert",
    "entrée",
    "plat",
    // Méthodes de cuisson
    "grillé",
    "cuit",
    "cru",
    "frit",
    "bouilli",
    // Caractéristiques
    "chaud",
    "froid",
    "sucré",
    "salé",
    "épicé",
    // Allergènes courants
    "gluten",
    "lactose",
    "noix",
    "œufs",
    "fruits de mer",
    // Régimes alimentaires
    "végétarien",
    "végétalien",
    "sans gluten",
    "halal",
    "casher",
    // Saisons
    "été",
    "hiver",
    "printemps",
    "automne",
    // Occasions
    "apéritif",
    "brunch",
    "dîner",
    "petit-déjeuner",
    "goûter",
  ],
};

// Suite de tests pour JSBench
export const benchmark = {
  // Test de la version fonctionnelle
  functional: () => {
    testData.searchTerms.forEach((term) => {
      functionalSearch.filterRecipes(testData.recipes, term);
    });
  },

  // Test de la version native
  native: () => {
    testData.searchTerms.forEach((term) => {
      nativeSearch.filterRecipes(testData.recipes, term);
    });
  },
};
