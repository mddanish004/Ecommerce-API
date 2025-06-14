import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
    },
    { timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);
export default Category;