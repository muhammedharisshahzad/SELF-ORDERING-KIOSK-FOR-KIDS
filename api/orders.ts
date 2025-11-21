import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // Generate order number
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 99).toString().padStart(2, '0');
    const orderNumber = `KID${timestamp}${random}`;

    const order = {
      id: Math.floor(Math.random() * 10000),
      orderNumber,
      ingredients: req.body.ingredients,
      totalPrice: req.body.totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    res.status(201).json(order);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
