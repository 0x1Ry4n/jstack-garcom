"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredients: [{
            name: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                required: true,
            }
        }],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Category' // referencia o model Category
    }
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
//# sourceMappingURL=product.js.map