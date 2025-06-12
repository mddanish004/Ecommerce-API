import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        price: { type: Number, required: true, min: 0 },
        stock: { type: Number, required: true, default: 0 },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    }, 
    { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;