import { BurgerIngredient } from "@shared/schema";

interface VisualBurgerProps {
  ingredients: BurgerIngredient[];
  size?: "small" | "medium" | "large";
}

export default function VisualBurger({ ingredients, size = "medium" }: VisualBurgerProps) {
  const sizeClasses = {
    small: { container: "w-32", bun: "w-28 h-10", layer: "h-3" },
    medium: { container: "w-56", bun: "w-52 h-14", layer: "h-4" },
    large: { container: "w-72", bun: "w-68 h-20", layer: "h-5" }
  };

  const currentSize = sizeClasses[size];

  const getIngredientStyle = (type: string, name: string) => {
    const baseHeight = currentSize.layer;
    switch (type) {
      case 'protein':
        // Realistic beef patty with texture
        if (name.includes('Beef')) {
          return `${currentSize.container} h-6 bg-gradient-to-br from-amber-900 via-stone-800 to-amber-950 rounded-lg shadow-2xl border-2 border-amber-950 relative overflow-hidden
          before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_40%,rgba(139,69,19,0.3),transparent_50%)]
          after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_70%_60%,rgba(101,67,33,0.3),transparent_50%)]`;
        }
        // Chicken with golden-brown color
        if (name.includes('Chicken')) {
          return `${currentSize.container} h-5 bg-gradient-to-br from-amber-600 via-yellow-700 to-amber-700 rounded-lg shadow-2xl border-2 border-amber-800
          before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_40%_50%,rgba(255,215,0,0.2),transparent_60%)]`;
        }
        return `${currentSize.container} ${baseHeight} bg-gradient-to-br from-amber-800 to-amber-950 rounded-lg shadow-2xl border-2 border-amber-950`;
      
      case 'cheese':
        // Realistic melted cheese effect
        return `${currentSize.container} h-3 bg-gradient-to-br from-yellow-300 via-orange-400 to-amber-500 rounded-lg shadow-lg border border-yellow-600 relative
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-yellow-200 before:to-transparent before:opacity-30
        after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-b after:from-transparent after:to-orange-600 after:opacity-40 after:blur-sm`;
      
      case 'vegetable':
        if (name.includes('Lettuce')) {
          // Crispy lettuce with texture
          return `${currentSize.container} h-3 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-lg shadow-md border border-green-700 relative overflow-hidden
          before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_20%_30%,rgba(144,238,144,0.4),transparent_50%)]
          after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_80%_70%,rgba(34,139,34,0.3),transparent_50%)]`;
        }
        if (name.includes('Tomato')) {
          // Juicy tomato slices
          return `${currentSize.container} h-4 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-lg shadow-lg border-2 border-red-800 relative
          before:absolute before:w-2 before:h-2 before:bg-red-300 before:rounded-full before:top-1 before:left-4 before:opacity-60
          after:absolute after:w-1.5 after:h-1.5 after:bg-red-200 after:rounded-full after:top-2 after:right-5 after:opacity-50`;
        }
        if (name.includes('Pickles')) {
          // Pickle slices with bumpy texture
          return `${currentSize.container} h-2 bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-lg shadow-md border border-green-900
          before:absolute before:inset-0 before:bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(34,139,34,0.3)_2px,rgba(34,139,34,0.3)_4px)]`;
        }
        if (name.includes('Onion')) {
          // Translucent onion rings
          return `${currentSize.container} h-3 bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 rounded-lg shadow-md border border-purple-500 opacity-90
          before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(255,255,255,0.3),transparent_60%)]`;
        }
        return `${currentSize.container} ${baseHeight} bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-lg border border-green-800`;
      
      case 'sauce':
        // Sauce layer with glossy effect
        if (name.includes('Ketchup')) {
          return `${currentSize.container} h-1.5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-full shadow-sm relative
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-red-400 before:to-transparent before:opacity-40 before:rounded-full`;
        }
        if (name.includes('Mustard')) {
          return `${currentSize.container} h-1.5 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 rounded-full shadow-sm relative
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-yellow-300 before:to-transparent before:opacity-50 before:rounded-full`;
        }
        if (name.includes('Mayo')) {
          return `${currentSize.container} h-1.5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full shadow-sm relative
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white before:to-transparent before:opacity-60 before:rounded-full`;
        }
        return `${currentSize.container} h-1.5 bg-gradient-to-r from-red-600 to-red-800 rounded-full shadow-sm`;
      
      default:
        return `${currentSize.container} ${baseHeight} bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg shadow-md`;
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
    <div className="flex flex-col items-center space-y-0.5">
      {/* Top Bun */}
      {ingredients.length > 0 && (
        <div className={`${currentSize.bun} bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-500 rounded-t-full shadow-2xl flex items-center justify-center text-yellow-900 font-bold text-xs border-3 border-amber-600 relative overflow-hidden
        before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,255,255,0.4),transparent_50%)]
        after:absolute after:top-2 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-8 after:bg-yellow-100 after:rounded-full after:opacity-20`}>
          🍞
        </div>
      )}
      
      {/* Ingredients Stack */}
      <div className="flex flex-col-reverse items-center space-y-reverse space-y-0.5">
        {ingredients.map((ingredient, index) => (
          <div
            key={`${ingredient.id}-${index}`}
            className={`${getIngredientStyle(ingredient.type, ingredient.name)} flex items-center justify-center text-white font-bold text-xs relative transition-all duration-300 hover:scale-105`}
            style={{
              animation: `slideIn 0.3s ease-out ${index * 0.05}s backwards`
            }}
          >
            <span className="mr-1 text-base drop-shadow-lg">{getIngredientEmoji(ingredient.type, ingredient.name)}</span>
            {size !== "small" && <span className="text-xs drop-shadow-md font-semibold">{ingredient.name}</span>}
          </div>
        ))}
      </div>
      
      {/* Bottom Bun */}
      <div className={`${currentSize.bun} bg-gradient-to-br from-amber-500 via-yellow-500 to-yellow-300 rounded-b-full shadow-2xl flex items-center justify-center text-yellow-900 font-bold text-xs border-3 border-amber-700 relative overflow-hidden
      before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_60%_60%,rgba(139,69,19,0.2),transparent_60%)]
      after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.3),transparent_40%)]`}>
        🍞
      </div>
    </div>
  );
}