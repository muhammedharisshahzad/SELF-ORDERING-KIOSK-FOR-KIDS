import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Mock ingredients data for now - replace with actual database calls
  const ingredients = [
    { id: 1, name: "Sesame Bun", type: "bun", price: 50, imageUrl: "", isAvailable: true },
    { id: 2, name: "Wheat Bun", type: "bun", price: 55, imageUrl: "", isAvailable: true },
    { id: 3, name: "Beef Patty", type: "protein", price: 150, imageUrl: "", isAvailable: true },
    { id: 4, name: "Chicken Breast", type: "protein", price: 130, imageUrl: "", isAvailable: true },
    { id: 5, name: "Veggie Patty", type: "protein", price: 100, imageUrl: "", isAvailable: true },
    { id: 6, name: "American Cheese", type: "cheese", price: 40, imageUrl: "", isAvailable: true },
    { id: 7, name: "Cheddar Cheese", type: "cheese", price: 45, imageUrl: "", isAvailable: true },
    { id: 8, name: "Lettuce", type: "vegetable", price: 20, imageUrl: "", isAvailable: true },
    { id: 9, name: "Tomato", type: "vegetable", price: 25, imageUrl: "", isAvailable: true },
    { id: 10, name: "Pickles", type: "vegetable", price: 15, imageUrl: "", isAvailable: true },
    { id: 11, name: "Onion", type: "vegetable", price: 20, imageUrl: "", isAvailable: true },
    { id: 12, name: "Ketchup", type: "sauce", price: 10, imageUrl: "", isAvailable: true },
    { id: 13, name: "Mustard", type: "sauce", price: 10, imageUrl: "", isAvailable: true },
    { id: 14, name: "Mayo", type: "sauce", price: 15, imageUrl: "", isAvailable: true }
  ];

  res.status(200).json(ingredients);
}
