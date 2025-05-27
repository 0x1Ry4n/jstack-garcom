import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imagePath: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    ingredients: [
        {
            ingredient: {
                type: Schema.Types.ObjectId,
                ref: 'Ingredient',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 0
            },
            unit: {
                type: String,
                required: true,
                trim: true
            }
        }
    ]
}, {
    timestamps: true
});


export const ProductModel = model('Product', productSchema);