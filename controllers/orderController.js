import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('items.product', 'name price');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.product', 'name price');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json({ message: 'Invalid order ID' });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { cartId, user } = req.body;
        if (!cartId) return res.status(400).json({ message: 'cartId is required' });

        const cart = await Cart.findById(cartId).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart not found or empty' });
        }

        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for product: ${item.product.name}` });
            }
        }

        const order = await Order.create({
            user: user || null,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            totalAmount: cart.totalPrice,
            status: 'Pending',
        });

        for (const item of cart.items) {
            await Product.findByIdAndUpdate(
                item.product._id,
                { $inc: { stock: -item.quantity } }
            );
        }

        await Cart.findByIdAndDelete(cartId);

        const populatedOrder = await Order.findById(order._id).populate('items.product', 'name price');
        res.status(201).json(populatedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
