"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const node_path_1 = __importDefault(require("node:path"));
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const createCategories_1 = require("./useCases/categories/createCategories");
const listCategories_1 = require("./useCases/categories/listCategories");
const createProduct_1 = require("./useCases/products/createProduct");
const listProducts_1 = require("./useCases/products/listProducts");
const listProductsByCategory_1 = require("./useCases/categories/listProductsByCategory");
const listOrders_1 = require("./useCases/orders/listOrders");
const createOrder_1 = require("./useCases/orders/createOrder");
const changeOrderStatus_1 = require("./useCases/orders/changeOrderStatus");
const deleteOrder_1 = require("./useCases/orders/deleteOrder");
exports.router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, node_path_1.default.resolve(__dirname, '..', 'uploads'));
        },
        filename(req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
});
// List categories
exports.router.get('/categories', listCategories_1.listCategories);
// Create category
exports.router.post('/categories', createCategories_1.createCategory);
// List products
exports.router.get('/products', listProducts_1.listProducts);
// Create product
exports.router.post('/products', upload.single('image'), createProduct_1.createProduct);
// Get products by category
exports.router.get('/categories/:categoryId/products', listProductsByCategory_1.listProductsByCategory);
// List orders
exports.router.get('/orders', listOrders_1.listOrders);
// Create order
exports.router.post('/orders', createOrder_1.createOrder);
// Change order status
exports.router.patch('/orders/:orderId', changeOrderStatus_1.changeOrderStatus);
// Delete order
exports.router.delete('/orders/:orderId', deleteOrder_1.deleteOrder);
//# sourceMappingURL=router.js.map