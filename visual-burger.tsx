import { BurgerIngredient } from "@shared/schema";

interface VisualBurgerProps {
  ingredients: BurgerIngredient[];
  size?: "small" | "medium" | "large";
}

export default function VisualBurger({ ingredients, size = "medium" }: VisualBurgerProps) {
  const sizeClasses = {
    small: { container: "w-32", bun: "w-28 h-8", layer: "h-2" },
    medium: { container: "w-48", bun: "w-44 h-12", layer: "h-3" },
    large: { container: "w-64", bun: "w-60 h-16", layer: "h-4" }
  };

  const currentSize = sizeClasses[size];

  const getIngredientStyle = (type: string, name: string) => {
    const baseHeight = currentSize.layer;
    switch (type) {
      case 'protein':
        return `${currentSize.container} ${baseHeight} bg-gradient-to-r from-amber-800 to-amber-900 rounded-lg shadow-lg border border-amber-900`;
      case 'cheese':
        return `${currentSize.container} ${baseHeight} bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg shadow-md border border-orange-500`;
      case 'vegetable':
        if (name.includes('Lettuce')) return `${currentSize.container} ${baseHeight} bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-md border border-green-600`;
        if (name.includes('Tomato')) return `${currentSize.container} ${baseHeight} bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md border border-red-600`;
        if (name.includes('Pickles')) return `${currentSize.container} ${baseHeight} bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-md border border-green-700`;
        if (name.includes('Onion')) return `${currentSize.container} ${baseHeight} bg-gradient-to-r from-purple-300 to-purple-400 rounded-lg shadow-md border border-purple-500`;
        return `${currentSize.container} ${baseHeight} bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md border border-green-600`;
      case 'sauce':
        return `${currentSize.container} h-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-sm`;
      default:
        return `${currentSize.container} ${baseHeight} bg-gray-400 rounded-lg shadow-md`;
    }
  };

  const getIngredientEmoji = (type: string, name: string) => {
    switch (type) {
      case 'protein':
        if (name.includes('Beef')) return '🥩';
        if (name.includes('Chicken')) return '🍗';
        if (name.includes('Veggie')) return '🌱';
        return '🥩';
      case 'cheese':
        return '🧀';
      case 'vegetable':
        if (name.includes('Lettuce')) return '🥬';
        if (name.includes('Tomato')) return '🍅';
        if (name.includes('Pickles')) return '🥒';
        if (name.includes('Onion')) return '🧅';
        return '🥬';
      case 'sauce':
        if (name.includes('Ketchup')) return '🍅';
        if (name.includes('Mustard')) return '🟡';
        if (name.includes('Mayo')) return '⚪';
        return '🍅';
      default:
        return '🍽️';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-1">
      {/* Top Bun */}
      {ingredients.length > 0 && (
        <div className={`${currentSize.bun} bg-gradient-to-t from-yellow-300 to-yellow-600 rounded-t-full shadow-lg flex items-center justify-center text-yellow-800 font-bold text-xs border-2 border-yellow-700`}>
          🍞
        </div>
      )}
      
      {/* Ingredients Stack */}
      <div className="flex flex-col-reverse items-center space-y-reverse space-y-1">
        {ingredients.map((ingredient, index) => (
          <div
            key={`${ingredient.id}-${index}`}
            className={`${getIngredientStyle(ingredient.type, ingredient.name)} flex items-center justify-center text-white font-bold text-xs relative`}
          >
            <span className="mr-1 text-xs">{getIngredientEmoji(ingredient.type, ingredient.name)}</span>
            {size !== "small" && <span className="text-xs">{ingredient.name}</span>}
          </div>
        ))}
      </div>
      
      {/* Bottom Bun */}
      <div className={`${currentSize.bun} bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-b-full shadow-lg flex items-center justify-center text-yellow-800 font-bold text-xs border-2 border-yellow-700`}>
        🍞
      </div>
    </div>
  );
}