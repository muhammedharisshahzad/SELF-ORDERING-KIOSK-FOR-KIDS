import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CelebrationModalProps {
  isOpen: boolean;
  orderNumber: string;
  onNewOrder: () => void;
}

export default function CelebrationModal({ isOpen, orderNumber, onNewOrder }: CelebrationModalProps) {
  useEffect(() => {
    if (isOpen) {
      createConfetti();
    }
  }, [isOpen]);

  const createConfetti = () => {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    // Clear existing confetti
    container.innerHTML = '';
    
    const colors = ['hsl(var(--brand-orange))', 'hsl(var(--brand-yellow))', 'hsl(var(--brand-mint))', 'hsl(var(--brand-pink))'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'celebration-confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      container.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="max-w-lg mx-auto my-4 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl border-2 border-white shadow-xl">
          <div className="text-center text-white p-6 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-white bg-opacity-20 rounded-full animate-float"></div>
            <div className="absolute top-10 right-5 w-12 h-12 bg-white bg-opacity-15 rounded-full animate-bounce"></div>
            <div className="absolute bottom-5 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="animate-bounce mb-4">
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-3xl">🍔</div>
              </div>
              <h1 className="font-fredoka text-2xl mb-3">
                🌟 ORDER PLACED! 🌟
              </h1>
              <p className="text-sm mb-4 font-bold">Your delicious burger is being prepared!</p>
              
              <div className="bg-white bg-opacity-25 rounded-2xl p-4 backdrop-blur-sm mb-4 border border-white border-opacity-30">
                <h3 className="font-fredoka text-lg mb-2 text-yellow-100">Order #{orderNumber}</h3>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-sm">⏰</span>
                  <p className="text-sm font-bold">Ready in 5-7 minutes</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-2">
                  <p className="text-xs font-medium">
                    🍽️ Your burger is being crafted with love!
                  </p>
                </div>
              </div>
              
              <Button
                onClick={onNewOrder}
                className="bg-white text-orange-500 font-fredoka font-bold py-2 px-6 rounded-full text-lg hover:bg-yellow-100 hover:scale-105 transition-all duration-300 shadow-xl border-2 border-orange-300"
              >
                🚀 Make Another Burger! 🚀
              </Button>
              
              <div className="mt-3 flex justify-center space-x-2">
                <span className="text-lg animate-bounce" style={{animationDelay: '0s'}}>🎊</span>
                <span className="text-lg animate-bounce" style={{animationDelay: '0.2s'}}>🎉</span>
                <span className="text-lg animate-bounce" style={{animationDelay: '0.4s'}}>🎊</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Confetti container */}
      <div id="confetti-container" className="fixed inset-0 pointer-events-none z-40"></div>
    </>
  );
}
