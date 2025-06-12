import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const getProducts = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        if (req.query.search) {
            filter.name = { $regex: req.query.search, $options: 'i' };
        }
        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: 'Invalid product ID' });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, category, description, stock } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                required: ['name', 'price', 'category'],
                received: { name, price, category }
            });
        }
        if (typeof price !== 'number' || price < 0) {
            return res.status(400).json({ 
                message: 'Price must be a positive number',
                received: price
            });
        }
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ 
                message: 'Invalid category ID',
                received: category
            });
        }
        const product = await Product.create({
            name,
            price,
            category,
            description: description || '',
            stock: stock || 0
        });
        res.status(201).json(product);
    } catch (err) {
        console.error('Product creation error:', err);
        res.status(400).json({ 
            message: 'Invalid input',
            error: err.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, price, category, ...rest } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({ message: 'Name, price, and category are required' });
        }
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Invalid category' });
        }
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, category, ...rest },
            { new: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: 'Invalid input or product ID' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid product ID' });
    }
};
