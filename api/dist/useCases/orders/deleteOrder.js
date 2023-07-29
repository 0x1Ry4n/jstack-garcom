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
exports.deleteOrder = void 0;
const order_1 = require("../../models/order");
function deleteOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orderId } = req.params;
        try {
            yield order_1.Order.findByIdAndDelete(orderId);
            res.status(204).send(); // ou res.sendStatus(204);
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
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=deleteOrder.js.map