import { z } from 'zod';
import { OrderStatus } from '../../../application/enums/order-status.enum';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const createOrderSchema = z.object({
    table: z.string(),
    status: z.nativeEnum(OrderStatus).default(OrderStatus.WAITING),
    products: z.array(z.object({
        product: objectId,
        quantity: z.number().positive().min(1).default(1)
    }))
});