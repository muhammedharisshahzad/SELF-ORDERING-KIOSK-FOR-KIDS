import { useState, useEffect } from "react";
import { BurgerIngredient } from "@shared/schema";

interface NutritionCharacterProps {
  lastAddedIngredient?: BurgerIngredient | null;
}

const nutritionInfo: Record<string, { calories: number; protein: string; vitamins: string; funFact: string }> = {
  "Sesame Bun": { calories: 150, protein: "4g", vitamins: "B vitamins", funFact: "Sesame seeds are tiny powerhouses of nutrition!" },
  "Wheat Bun": { calories: 130, protein: "5g", vitamins: "Fiber & B vitamins", funFact: "Whole wheat gives you energy all day long!" },
  "Beef Patty": { calories: 220, protein: "20g", vitamins: "Iron & B12", funFact: "Beef is packed with muscle-building protein!" },
  "Chicken Breast": { calories: 180, protein: "25g", vitamins: "Niacin & B6", funFact: "Chicken helps you grow big and strong!" },
  "Veggie Patty": { calories: 150, protein: "12g", vitamins: "Fiber & folate", funFact: "Plants give you superpowers!" },
  "Fresh Lettuce": { calories: 5, protein: "0.5g", vitamins: "Vitamin K & A", funFact: "Lettuce is 95% water - nature's drink!" },
  "Tomato Slices": { calories: 20, protein: "1g", vitamins: "Vitamin C & lycopene", funFact: "Tomatoes are actually fruits, not vegetables!" },
  "Pickles": { calories: 4, protein: "0.2g", vitamins: "Vitamin K", funFact: "Pickles are cucumbers that went swimming!" },
  "Onion Rings": { calories: 30, protein: "1g", vitamins: "Vitamin C", funFact: "Onions can make you cry happy tears!" },
  "American Cheese": { calories: 80, protein: "5g", vitamins: "Calcium & B12", funFact: "Cheese helps build super strong bones!" },
  "Cheddar Cheese": { calories: 90, protein: "6g", vitamins: "Calcium & A", funFact: "Cheddar gets tastier as it ages, just like wisdom!" },
  "Ketchup": { calories: 15, protein: "0g", vitamins: "Vitamin A", funFact: "Ketchup was once sold as medicine!" },
  "Mustard": { calories: 5, protein: "0.3g", vitamins: "Turmeric", funFact: "Mustard seeds are ancient spice treasures!" },
  "Mayo": { calories: 90, protein: "0.1g", vitamins: "Vitamin E", funFact: "Mayo makes everything creamy and delicious!" }
};

export default function NutritionCharacter({ lastAddedIngredient }: NutritionCharacterProps) {
  const [showBubble, setShowBubble] = useState(false);
  const [currentInfo, setCurrentInfo] = useState<any>(null);

  useEffect(() => {
    if (lastAddedIngredient) {
      const info = nutritionInfo[lastAddedIngredient.name];
      if (info) {
        setCurrentInfo({ ...info, name: lastAddedIngredient.name });
        setShowBubble(true);
        
        // Speak the information
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(
            `Great choice! ${lastAddedIngredient.name} has ${info.calories} calories and ${info.protein} of protein. ${info.funFact}`
          );
          utterance.rate = 0.8;
          utterance.pitch = 1.2;
          speechSynthesis.speak(utterance);
        }
        
        // Hide bubble after 5 seconds
        setTimeout(() => setShowBubble(false), 9000);
      }
    }
  }, [lastAddedIngredient]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Speech Bubble */}
      {showBubble && currentInfo && (
        <div className="relative mb-4 mr-8">
          <div className="bg-white rounded-2xl shadow-xl p-4 max-w-xs border-4 border-brand-orange animate-pop">
            <div className="text-center">
              <h4 className="font-fredoka text-lg text-brand-orange mb-2">{currentInfo.name}</h4>
              <div className="text-sm space-y-1 text-gray-700">
                <p><span className="font-bold">Calories:</span> {currentInfo.calories}</p>
                <p><span className="font-bold">Protein:</span> {currentInfo.protein}</p>
                <p><span className="font-bold">Rich in:</span> {currentInfo.vitamins}</p>
              </div>
              <div className="mt-3 p-2 bg-brand-yellow bg-opacity-20 rounded-lg">
                <p className="text-xs font-medium text-gray-600">{currentInfo.funFact}</p>
              </div>
            </div>
            {/* Speech bubble pointer */}
            <div className="absolute bottom-0 right-8 transform translate-y-2">
              <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-brand-orange"></div>
              <div className="w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-white absolute bottom-1 left-1"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Character */}
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-brand-orange to-brand-pink rounded-full shadow-xl animate-char-wave flex items-center justify-center border-4 border-white">
          <div className="text-4xl">👨‍🍳</div>
        </div>
        
        {/* Character eyes that follow cursor */}
        <div className="absolute top-6 left-6 w-3 h-3 bg-white rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-6 right-6 w-3 h-3 bg-white rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
        </div>
        
        {/* Character name */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-brand-mint text-white px-3 py-1 rounded-full text-xs font-bold">
          Chef Nutri
        </div>
      </div>
    </div>
  );
}