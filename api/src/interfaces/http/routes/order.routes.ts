import { Router } from 'express';
import { createOrderController, listOrderController, changeOrderStatusController, deleteOrderController } from '../controllers/order.controller';
import { createOrderSchema } from '../schemas/order.schema';
import { validateData } from '../middleware/validation.middleware';

const router = Router();

router.post('/orders', validateData(createOrderSchema), createOrderController);
router.get('/orders', listOrderController);
router.patch('/orders/:orderId', changeOrderStatusController);
router.delete('/orders/:orderId', deleteOrderController);

export default router;