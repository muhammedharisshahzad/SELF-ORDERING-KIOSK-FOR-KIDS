import { ingredients, orders, type Ingredient, type InsertIngredient, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  // Ingredients
  getIngredients(): Promise<Ingredient[]>;
  getIngredientsByType(type: string): Promise<Ingredient[]>;
  getIngredient(id: number): Promise<Ingredient | undefined>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private ingredients: Map<number, Ingredient>;
  private orders: Map<number, Order>;
  private currentIngredientId: number;
  private currentOrderId: number;

  constructor() {
    this.ingredients = new Map();
    this.orders = new Map();
    this.currentIngredientId = 1;
    this.currentOrderId = 1;
    
   
    this.initializeIngredients();
  }

  private initializeIngredients() {
    const defaultIngredients: Omit<Ingredient, 'id'>[] = [
  
      { name: "Sesame Bun", type: "bun", price: "50", imageUrl: "https://cdn.pixabay.com/photo/2022/01/24/19/57/bread-6964507_1280.jpg", isAvailable: true },
      { name: "Wheat Bun", type: "bun", price: "50", imageUrl: "https://cdn.pixabay.com/photo/2018/03/24/12/49/food-3256557_960_720.jpg", isAvailable: true },
      
     
      { name: "Beef Patty", type: "protein", price: "100", imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80", isAvailable: true },
      { name: "Chicken Breast", type: "protein", price: "85", imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80", isAvailable: true },
      { name: "Veggie Patty", type: "protein", price: "75", imageUrl: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80", isAvailable: true },
      
      
      { name: "Fresh Lettuce", type: "vegetable", price: "80", imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80", isAvailable: true },
      { name: "Tomato Slices", type: "vegetable", price: "200", imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80", isAvailable: true },
      { name: "Pickles", type: "vegetable", price: "150", imageUrl: "https://images.unsplash.com/photo-1628773822503-930a7eaecf80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80", isAvailable: true },
      { name: "Onion Rings", type: "vegetable", price: "180", imageUrl: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80", isAvailable: true },
      
     
      { name: "Cheddar Cheese", type: "cheese", price: "300", imageUrl: "https://cdn.pixabay.com/photo/2010/12/16/12/09/keens-cheddar-3514_1280.jpg", isAvailable: true },
      { name: "Mozzarella Cheese", type: "cheese", price: "350", imageUrl: "https://cdn.pixabay.com/photo/2010/12/16/12/12/mozarella-3521_1280.jpg", isAvailable: true },
         
      { name: "Ketchup", type: "sauce", price: "80", imageUrl: "https://cdn.pixabay.com/photo/2014/05/28/12/26/ketchup-356439_1280.jpg", isAvailable: true },
      { name: "BBQ Sauce", type: "sauce", price: "90", imageUrl: "https://cdn.pixabay.com/photo/2015/01/30/08/52/ketchup-617231_1280.jpg", isAvailable: true },
      { name: "Mayo", type: "sauce", price: "100", imageUrl: "https://cdn.pixabay.com/photo/2017/09/02/16/49/fast-food-2707831_1280.jpg", isAvailable: true },
    ];

    defaultIngredients.forEach(ingredient => {
      const id = this.currentIngredientId++;
      this.ingredients.set(id, { ...ingredient, id });
    });
  }

  async getIngredients(): Promise<Ingredient[]> {
    return Array.from(this.ingredients.values()).filter(ing => ing.isAvailable);
  }

  async getIngredientsByType(type: string): Promise<Ingredient[]> {
    return Array.from(this.ingredients.values()).filter(ing => ing.type === type && ing.isAvailable);
  }

  async getIngredient(id: number): Promise<Ingredient | undefined> {
    return this.ingredients.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const orderNumber = `KID${String(id).padStart(4, '0')}`;
    const order: Order = {
      ...insertOrder,
      id,
      orderNumber,
      status: insertOrder.status || "pending",
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(order => order.orderNumber === orderNumber);
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      const updatedOrder = { ...order, status };
      this.orders.set(id, updatedOrder);
      return updatedOrder;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
