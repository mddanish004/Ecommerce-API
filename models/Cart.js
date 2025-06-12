import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
    {
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true, min: 1 }
            }
        ],
        totalPrice: { type: Number, required: true, default: 0 }
    },
    { timestamps: true }
);

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;