import { BurgerIngredient } from "@shared/schema";

export const ingredientTypeLabels = {
  bun: "🍞 Buns",
  protein: "🥩 Proteins", 
  vegetable: "🥬 Veggies",
  cheese: "🧀 Cheese",
  sauce: "🍅 Sauces"
};

export const ingredientTypeColors = {
  bun: "bg-brand-yellow bg-opacity-20",
  protein: "bg-brand-pink bg-opacity-20", 
  vegetable: "bg-brand-green bg-opacity-20",
  cheese: "bg-brand-orange bg-opacity-20",
  sauce: "bg-brand-mint bg-opacity-20"
};

export const burgerLayerStyles = {
  bun: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-800",
  protein: "bg-gradient-to-r from-red-600 to-red-800 text-white",
  vegetable: "bg-gradient-to-r from-green-400 to-green-600 text-white",
  cheese: "bg-gradient-to-r from-orange-400 to-orange-600 text-white",
  sauce: "bg-gradient-to-r from-red-500 to-red-700 text-white"
};

export function calculateBurgerTotal(ingredients: BurgerIngredient[]): number {
  const basePrice = 50; // Bottom bun in PKR
  const topBunPrice = 50; // Top bun in PKR
  const ingredientsTotal = ingredients.reduce((total, ingredient) => total + ingredient.price, 0);
  return basePrice + topBunPrice + ingredientsTotal;
}

export function groupIngredientsByCount(ingredients: BurgerIngredient[]) {
  const grouped: Record<string, BurgerIngredient & { count: number }> = {};
  
  ingredients.forEach(ingredient => {
    const key = `${ingredient.id}-${ingredient.name}`;
    if (grouped[key]) {
      grouped[key].count++;
    } else {
      grouped[key] = { ...ingredient, count: 1 };
    }
  });
  
  return Object.values(grouped);
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 99).toString().padStart(2, '0');
  return `KID${timestamp}${random}`;
}
