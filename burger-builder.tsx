import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BurgerIngredient } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import IngredientPanel from "@/components/ingredient-panel";
import BurgerCanvas from "@/components/burger-canvas";
import InstructionsPanel from "@/components/instructions-panel";
import OrderSummaryModal from "@/components/order-summary-modal";
import CelebrationModal from "@/components/celebration-modal";
import NutritionCharacter from "@/components/nutrition-character";
import { calculateBurgerTotal } from "@/lib/ingredients";
import { Ham } from "lucide-react";

export default function BurgerBuilder() {
  const [burgerIngredients, setBurgerIngredients] = useState<BurgerIngredient[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [lastAddedIngredient, setLastAddedIngredient] = useState<BurgerIngredient | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const placeOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: (order) => {
      setOrderNumber(order.orderNumber);
      setShowOrderSummary(false);
      setShowCelebration(true);
      setCurrentStep(3);
      toast({
        title: "Order Placed!",
        description: `Your burger order #${order.orderNumber} has been placed successfully!`,
      });
    },
    onError: () => {
      toast({
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleIngredientAdd = (ingredient: BurgerIngredient) => {
    setBurgerIngredients(prev => [...prev, ingredient]);
    setLastAddedIngredient(ingredient);
    
    // Show success feedback
    toast({
      title: "Nice Choice!",
      description: `Added ${ingredient.name} to your burger`,
    });

    // Progress through steps based on ingredients added
    if (burgerIngredients.length === 0 && currentStep === 1) {
      setCurrentStep(2);
    } else if (burgerIngredients.length >= 2 && currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleClearBurger = () => {
    setBurgerIngredients([]);
    setCurrentStep(1);
    toast({
      title: "Burger Cleared",
      description: "Start building your new burger!",
    });
  };

  const handleCompleteBurger = () => {
    setShowOrderSummary(true);
  };

  const handlePlaceOrder = () => {
    const total = calculateBurgerTotal(burgerIngredients);
    const orderData = {
      ingredients: burgerIngredients.map(ing => ({ id: ing.id, quantity: 1 })),
      totalPrice: total.toString(),
      status: "pending"
    };
    
    placeOrderMutation.mutate(orderData);
  };

  const handleNewOrder = () => {
    setShowCelebration(false);
    setBurgerIngredients([]);
    setCurrentStep(1);
    setOrderNumber("");
    setLastAddedIngredient(null);
  };

  const hasProtein = burgerIngredients.some(ing => ing.type === 'protein');
  const canComplete = burgerIngredients.length > 0; // Allow completion with any ingredients

  const steps = [
    { number: 1, label: "Step 1", active: currentStep >= 1 },
    { number: 2, label: "Step 2", active: currentStep >= 2 },
    { number: 3, label: "Order", active: currentStep >= 3 }
  ];

  return (
    <div className="min-h-screen"
         style={{
           background: 'linear-gradient(135deg, #FFE4E1 0%, #FFB6C1 25%, #DDA0DD 50%, #98FB98 75%, #87CEEB 100%)',
           minHeight: '100vh'
         }}>
      {/* Header */}
      <header className="bg-white shadow-lg rounded-b-3xl mx-4 pt-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-brand-orange rounded-full p-3 animate-float">
              <Ham className="text-white h-6 w-6" />
            </div>
            <h1 className="font-fredoka text-3xl text-gray-800">Build Your Burger!</h1>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center rounded-full px-4 py-2 ${
                  step.active ? 'bg-brand-orange' : 'bg-gray-300'
                }`}>
                  <span className={`font-bold ${
                    step.active ? 'text-white' : 'text-gray-600'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-8 h-1 bg-gray-300 rounded mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          <IngredientPanel onIngredientSelect={handleIngredientAdd} />
          
          <BurgerCanvas
            ingredients={burgerIngredients}
            onIngredientAdd={handleIngredientAdd}
            onClearBurger={handleClearBurger}
            onCompleteBurger={handleCompleteBurger}
            canComplete={canComplete}
          />
          
          <InstructionsPanel />
        </div>
      </div>

      {/* Modals */}
      <OrderSummaryModal
        isOpen={showOrderSummary}
        onClose={() => setShowOrderSummary(false)}
        ingredients={burgerIngredients}
        onBackToBuild={() => setShowOrderSummary(false)}
        onPlaceOrder={handlePlaceOrder}
      />

      <CelebrationModal
        isOpen={showCelebration}
        orderNumber={orderNumber}
        onNewOrder={handleNewOrder}
      />

      {/* Nutrition Character */}
      <NutritionCharacter lastAddedIngredient={lastAddedIngredient} />
    </div>
  );
}
