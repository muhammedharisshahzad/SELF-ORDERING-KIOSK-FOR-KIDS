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
    <div className="min-h-screen relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #FFE4E1 0%, #FFD4E5 20%, #FFB6C1 35%, #E6B8FF 50%, #DDA0DD 65%, #B4E7CE 80%, #98FB98 90%, #87CEEB 100%)',
           minHeight: '100vh'
         }}>
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">🍔</div>
        <div className="absolute top-32 right-20 text-5xl opacity-15 animate-float" style={{animationDelay: '1s'}}>🍟</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-float" style={{animationDelay: '2s'}}>🥤</div>
        <div className="absolute top-1/2 right-10 text-5xl opacity-15 animate-float" style={{animationDelay: '1.5s'}}>🍕</div>
      </div>
      
      {/* Header */}
      <header className="glass-card shadow-2xl rounded-b-[2.5rem] mx-4 pt-6 pb-4 px-8 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-4 animate-float shadow-lg">
              <Ham className="text-white h-8 w-8" />
            </div>
            <div>
              <h1 className="font-fredoka text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Kids Burger Builder
              </h1>
              <p className="text-gray-600 font-medium">Create your perfect burger!</p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center rounded-2xl px-5 py-3 transition-all duration-300 ${
                  step.active 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg scale-105' 
                    : 'bg-gray-200 scale-95'
                }`}>
                  <span className={`font-bold text-sm ${
                    step.active ? 'text-white' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-1 rounded mx-2 transition-all duration-300 ${
                    steps[index + 1].active ? 'bg-gradient-to-r from-orange-400 to-pink-400' : 'bg-gray-300'
                  }`}></div>
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
