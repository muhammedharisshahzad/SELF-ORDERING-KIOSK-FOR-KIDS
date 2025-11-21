import { BurgerIngredient } from "@shared/schema";
import { calculateBurgerTotal, groupIngredientsByCount } from "@/lib/ingredients";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import VisualBurger from "@/components/visual-burger";

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredients: BurgerIngredient[];
  onBackToBuild: () => void;
  onPlaceOrder: () => void;
}

export default function OrderSummaryModal({
  isOpen,
  onClose,
  ingredients,
  onBackToBuild,
  onPlaceOrder
}: OrderSummaryModalProps) {
  const groupedIngredients = groupIngredientsByCount(ingredients);
  const total = calculateBurgerTotal(ingredients);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 rounded-3xl flex flex-col max-h-[90vh] my-auto">
        <div className="flex-1 overflow-y-auto text-center">
          <div className="bg-brand-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Check className="text-white h-8 w-8" />
          </div>
          
          <DialogHeader>
            <DialogTitle className="font-fredoka text-2xl text-gray-800 mb-4">
              Awesome Burger!
            </DialogTitle>
          </DialogHeader>
          
          <p className="text-gray-600 mb-6">Your delicious creation is ready to order!</p>
          
          {/* Visual Burger Preview */}
          <div className="mb-6 flex justify-center">
            <div className="bg-gradient-to-br from-brand-lavender to-brand-mint p-4 rounded-2xl">
              <VisualBurger ingredients={ingredients} size="medium" />
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h3 className="font-bold text-gray-700 mb-2">Your Burger Contains:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              {/* Bottom bun */}
              <div className="flex justify-between py-1">
                <span>Bottom Bun</span>
                <span>Rs 50</span>
              </div>
              
              {/* Ingredients */}
              {groupedIngredients.map((ingredient) => (
                <div key={`${ingredient.id}-${ingredient.name}`} className="flex justify-between py-1">
                  <span>
                    {ingredient.name} {ingredient.count > 1 ? `(x${ingredient.count})` : ''}
                  </span>
                  <span>Rs {(ingredient.price * ingredient.count)}</span>
                </div>
              ))}
              
              {/* Top bun if ingredients exist */}
              {ingredients.length > 0 && (
                <div className="flex justify-between py-1">
                  <span>Top Bun</span>
                  <span>Rs 50</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">Total:</span>
                <span className="font-bold text-brand-orange text-xl">Rs {total}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fixed Buttons Section */}
        <div className="flex space-x-4 pt-4 border-t border-gray-200">
          <Button
            onClick={onBackToBuild}
            variant="secondary"
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Build
          </Button>
          <Button
            onClick={onPlaceOrder}
            className="flex-1 bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-full"
          >
            Place Order!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}