import { BurgerIngredient } from "@shared/schema";
import { useDragDrop } from "@/hooks/use-drag-drop";
import { HandIcon, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BurgerCanvasProps {
  ingredients: BurgerIngredient[];
  onIngredientAdd: (ingredient: BurgerIngredient) => void;
  onClearBurger: () => void;
  onCompleteBurger: () => void;
  canComplete: boolean;
}

export default function BurgerCanvas({ 
  ingredients, 
  onIngredientAdd, 
  onClearBurger, 
  onCompleteBurger,
  canComplete 
}: BurgerCanvasProps) {
  const { dragState, handlers } = useDragDrop();

  const playDropSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.15);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      // Silently fail if audio context is not available
      console.log('Audio not available');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    handlers.onDragOver(e);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const ingredientData = e.dataTransfer.getData('application/json');
      if (ingredientData) {
        const ingredient = JSON.parse(ingredientData);
        playDropSound();
        onIngredientAdd(ingredient);
      }
    } catch (error) {
      console.error('Error parsing dropped ingredient:', error);
    }
    handlers.onDragLeave();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handlers.onTouchEnd(e, onIngredientAdd);
  };

  return (
    <div className="col-span-6 bg-white rounded-3xl shadow-xl p-8 flex flex-col">
      <div className="text-center mb-8">
        <h2 className="font-fredoka text-3xl text-gray-800 mb-2">Build Your Masterpiece!</h2>
        <p className="text-gray-600 text-lg">Drag ingredients here to stack your burger</p>
      </div>
      
      {/* Burger Building Canvas */}
      <div className="flex-1 flex items-end justify-center relative">
        <div 
          className={`drop-zone relative w-80 h-96 bg-gradient-to-t from-brand-lavender to-transparent rounded-3xl flex flex-col-reverse items-center justify-start p-4 border-4 border-dashed border-gray-300 ${dragState.isDragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handlers.onDragLeave}
          onDrop={handleDrop}
          onTouchEnd={handleTouchEnd}
        >
          {/* Bottom Bun (Always present) */}
          <div className="burger-layer w-72 h-20 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-b-full shadow-xl flex items-center justify-center mb-1 border-2 border-yellow-700">
            <span className="text-yellow-800 font-bold text-sm">🍞 Bottom Bun</span>
          </div>
          
          {/* Dynamic Ingredients Stack */}
          <div className="flex flex-col-reverse items-center">
            {ingredients.map((ingredient, index) => {
              // Simplified styling based on ingredient type
              let layerClass = 'w-64 h-5 bg-gray-400 rounded-lg shadow-md';
              let emoji = '🍽️';
              
              if (ingredient.type === 'protein') {
                layerClass = 'w-64 h-6 bg-gradient-to-r from-amber-800 to-amber-900 rounded-lg shadow-lg border-2 border-amber-900';
                emoji = ingredient.name.includes('Beef') ? '🥩' : ingredient.name.includes('Chicken') ? '🍗' : '🌱';
              } else if (ingredient.type === 'cheese') {
                layerClass = 'w-68 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg shadow-md border border-orange-500';
                emoji = '🧀';
              } else if (ingredient.type === 'vegetable') {
                if (ingredient.name.includes('Lettuce')) {
                  layerClass = 'w-70 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-md border border-green-600';
                  emoji = '🥬';
                } else if (ingredient.name.includes('Tomato')) {
                  layerClass = 'w-66 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md border border-red-600';
                  emoji = '🍅';
                } else if (ingredient.name.includes('Pickles')) {
                  layerClass = 'w-60 h-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-md border border-green-700';
                  emoji = '🥒';
                } else if (ingredient.name.includes('Onion')) {
                  layerClass = 'w-62 h-4 bg-gradient-to-r from-purple-300 to-purple-400 rounded-lg shadow-md border border-purple-500';
                  emoji = '🧅';
                } else {
                  layerClass = 'w-64 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md border border-green-600';
                  emoji = '🥬';
                }
              } else if (ingredient.type === 'sauce') {
                layerClass = 'w-70 h-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-sm';
                emoji = ingredient.name.includes('Ketchup') ? '🍅' : ingredient.name.includes('Mustard') ? '🟡' : '⚪';
              }

              return (
                <div
                  key={`${ingredient.id}-${index}`}
                  className={`burger-layer ${layerClass} flex items-center justify-center mb-1 text-white font-bold text-xs animate-ingredient-drop relative`}
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    zIndex: ingredients.length - index
                  }}
                >
                  <span className="mr-1">{emoji}</span>
                  <span className="text-shadow text-xs">{ingredient.name}</span>
                </div>
              );
            })}
            
            {/* Top Bun (only if we have ingredients) */}
            {ingredients.length > 0 && (
              <div className="burger-layer w-72 h-20 bg-gradient-to-t from-yellow-300 to-yellow-600 rounded-t-full shadow-xl flex items-center justify-center mb-2 text-yellow-800 font-bold text-sm animate-ingredient-drop border-2 border-yellow-700"
                   style={{ animationDelay: `${ingredients.length * 0.2}s` }}>
                🍞 Top Bun
              </div>
            )}
          </div>
          
          {/* Floating Helper */}
          {ingredients.length === 0 && (
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-brand-orange text-white px-4 py-2 rounded-full shadow-lg animate-bounce-gentle">
              <HandIcon className="inline mr-2 h-4 w-4" />
              <span className="font-bold">Drop ingredients here!</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <Button
          onClick={onClearBurger}
          variant="secondary"
          size="lg"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Start Over
        </Button>
        <Button
          onClick={onCompleteBurger}
          disabled={!canComplete}
          size="lg"
          className={`bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ${canComplete ? 'animate-bounce-gentle' : 'opacity-50 cursor-not-allowed'}`}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          My Burger is Ready!
        </Button>
      </div>
    </div>
  );
}
