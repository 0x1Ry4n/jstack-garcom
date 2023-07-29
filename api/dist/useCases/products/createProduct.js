"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const product_1 = require("../../models/product");
function createProduct(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, price, category, ingredients } = req.body;
        const imagePath = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || '';
        try {
            const product = yield product_1.Product.create({
                name,
                description,
                price: Number(price),
                category,
                imagePath,
                ingredients: ingredients ? JSON.parse(ingredients) : []
            });
            res.status(201).json(product);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(500).json({
                    error: err.message
                });
            }
            else {
                res.status(500).json({
                    error: 'Internal Error'
                });
            }
        }
    });
}
exports.createProduct = createProduct;
//# sourceMappingURL=createProduct.js.map