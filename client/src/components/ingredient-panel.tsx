import { useQuery } from "@tanstack/react-query";
import { BurgerIngredient } from "@shared/schema";
import { ingredientTypeLabels, ingredientTypeColors } from "@/lib/ingredients";
import { useDragDrop } from "@/hooks/use-drag-drop";
import { Carrot } from "lucide-react";

interface IngredientPanelProps {
  onIngredientSelect: (ingredient: BurgerIngredient) => void;
}

export default function IngredientPanel({ onIngredientSelect }: IngredientPanelProps) {
  const { data: ingredients = [], isLoading } = useQuery<BurgerIngredient[]>({
    queryKey: ["/api/ingredients"],
  });

  const { handlers } = useDragDrop();

  if (isLoading) {
    return (
      <div className="col-span-3 bg-white rounded-3xl shadow-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Group ingredients by type
  const ingredientsByType = ingredients.reduce((acc: Record<string, BurgerIngredient[]>, ingredient: any) => {
    if (!acc[ingredient.type]) {
      acc[ingredient.type] = [];
    }
    acc[ingredient.type].push({
      id: ingredient.id,
      name: ingredient.name,
      type: ingredient.type,
      price: parseFloat(ingredient.price),
      imageUrl: ingredient.imageUrl
    });
    return acc;
  }, {});

  const handleDragStart = (ingredient: BurgerIngredient, e: React.DragEvent) => {
    handlers.onDragStart(ingredient);
    e.dataTransfer.setData('application/json', JSON.stringify(ingredient));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleTouchStart = (ingredient: BurgerIngredient, e: React.TouchEvent) => {
    handlers.onTouchStart(ingredient, e);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handlers.onTouchEnd(e, onIngredientSelect);
  };

  const handleClick = (ingredient: BurgerIngredient) => {
    onIngredientSelect(ingredient);
  };

  return (
    <div className="col-span-3 bg-white rounded-3xl shadow-xl p-6 overflow-y-auto">
      <h2 className="font-fredoka text-2xl text-center text-gray-800 mb-6">
        <Carrot className="text-brand-orange mr-2 inline" />
        Pick Your Ingredients!
      </h2>
      
      <div className="space-y-4">
        {Object.entries(ingredientsByType).map(([type, typeIngredients]) => (
          <div key={type} className={`${ingredientTypeColors[type as keyof typeof ingredientTypeColors]} rounded-2xl p-4`}>
            <h3 className="font-fredoka text-lg text-gray-700 mb-3">
              {ingredientTypeLabels[type as keyof typeof ingredientTypeLabels]}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {(typeIngredients as BurgerIngredient[]).map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="drag-item bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer animate-float"
                  draggable
                  onDragStart={(e) => handleDragStart(ingredient, e)}
                  onDragEnd={handlers.onDragEnd}
                  onTouchStart={(e) => handleTouchStart(ingredient, e)}
                  onTouchEnd={handleTouchEnd}
                  onClick={() => handleClick(ingredient)}
                  style={{ animationDelay: `${Math.random() * 2}s` }}
                >
                  <img 
                    src={ingredient.imageUrl} 
                    alt={ingredient.name}
                    className="w-full h-16 object-cover rounded-lg ingredient-shadow"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100"><rect width="200" height="100" fill="%23f3f4f6"/><text x="100" y="55" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="14">' + ingredient.name + '</text></svg>';
                    }}
                  />
                  <p className="text-center font-bold text-sm mt-2">{ingredient.name}</p>
                  <p className="text-center text-xs text-gray-500">Rs {ingredient.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
