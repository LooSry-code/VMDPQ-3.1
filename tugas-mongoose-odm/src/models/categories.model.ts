import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CategoriesModel = mongoose.model("Categories", CategorySchema);

export default CategoriesModel;
