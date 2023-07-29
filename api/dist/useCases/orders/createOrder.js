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
exports.createOrder = void 0;
const order_1 = require("../../models/order");
const __1 = require("../..");
function createOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { table, products } = req.body;
        try {
            const order = yield order_1.Order.create({
                table,
                products: products || []
            });
            const orderDetails = yield order.populate('products.product');
            // io.emit('neworder');
            __1.io.emit('neworder', orderDetails);
            res.status(201).json(order);
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
exports.createOrder = createOrder;
//# sourceMappingURL=createOrder.js.map