import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true, min: 1 }
            }
        ],
        totalAmount: { type: Number, required: true },
        status: { 
            type: String, 
            required: true, 
            default: 'Pending',
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
        },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);
export default Order;