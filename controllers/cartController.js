import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('items.product', 'name price');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: 'Invalid cart ID' });
  }
};

export const createOrUpdateCart = async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'productId and quantity are required' });
    }
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart;
    if (cartId) {
      cart = await Cart.findById(cartId);
    }
    if (!cart) {
      cart = new Cart({ items: [], totalPrice: 0 });
    }

    
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    
    cart.totalPrice = await calculateTotal(cart.items);

    await cart.save();
    await cart.populate('items.product', 'name price');
    res.status(cartId ? 200 : 201).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    if (quantity > 0) {
      
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      if (product.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    cart.totalPrice = await calculateTotal(cart.items);
    await cart.save();
    await cart.populate('items.product', 'name price');
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid cart ID' });
  }
};


async function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
}