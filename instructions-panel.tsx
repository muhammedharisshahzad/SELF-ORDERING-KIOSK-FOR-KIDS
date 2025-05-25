import { Star, Trophy } from "lucide-react";

export default function InstructionsPanel() {
  const instructions = [
    "Pick your favorite bun to start",
    "Drag and drop ingredients onto your burger", 
    "Stack them up to make it yummy!",
    "Click \"Ready\" when you're done!"
  ];

  const funFacts = [
    { icon: "🍔", text: "Did you know? The first hamburger was made in 1885!" },
    { icon: "🍅", text: "Tomatoes are actually fruits, not vegetables!" },
    { icon: "🥬", text: "Lettuce is 95% water!" }
  ];

  return (
    <div className="col-span-3 bg-white rounded-3xl shadow-xl p-6">
      <h2 className="font-fredoka text-2xl text-center text-gray-800 mb-6">
        <Star className="text-brand-yellow mr-2 inline" />
        How to Play!
      </h2>
      
      <div className="space-y-6">
        {/* Instructions */}
        <div className="bg-brand-mint bg-opacity-20 rounded-2xl p-4">
          <h3 className="font-fredoka text-lg text-gray-700 mb-3">📝 Instructions</h3>
          <div className="space-y-3 text-sm">
            {instructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-brand-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p>{instruction}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Fun Facts */}
        <div className="bg-brand-yellow bg-opacity-20 rounded-2xl p-4">
          <h3 className="font-fredoka text-lg text-gray-700 mb-3">🎉 Fun Facts</h3>
          <div className="space-y-2 text-sm">
            {funFacts.map((fact, index) => (
              <p key={index} className="flex items-start space-x-2">
                <span className="flex-shrink-0">{fact.icon}</span>
                <span>{fact.text}</span>
              </p>
            ))}
          </div>
        </div>
        
        {/* Encouragement */}
        <div className="bg-brand-pink bg-opacity-20 rounded-2xl p-4 text-center">
          <div className="animate-float">
            <Trophy className="text-brand-yellow text-3xl mb-2 mx-auto" size={48} />
          </div>
          <h3 className="font-fredoka text-lg text-gray-700 mb-2">You're Doing Great!</h3>
          <p className="text-sm text-gray-600">Keep building your perfect burger!</p>
        </div>
      </div>
    </div>
  );
}
