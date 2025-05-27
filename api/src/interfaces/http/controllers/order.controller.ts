import { Request, Response } from 'express';
import { CreateOrderUseCase } from '../../../application/use-cases/order/create-order.use-case';
import { ListOrdersUseCase } from '../../../application/use-cases/order/list-orders.use-case';
import { ChangeOrderStatusUseCase } from '../../../application/use-cases/order/change-order-status.use-case';
import { DeleteOrderUseCase } from '../../../application/use-cases/order/delete-order.use-case';
import { OrderRepositoryImpl } from '../../../infrastructure/database/mongoose/order/order.repository.impl';
import { io } from '../../..';

const orderRepo = new OrderRepositoryImpl();

const createOrderUseCase = new CreateOrderUseCase(orderRepo);
const listOrderUseCase = new ListOrdersUseCase(orderRepo);
const changeOrderStatusUseCase = new ChangeOrderStatusUseCase(orderRepo);
const deleteOrderUseCase = new DeleteOrderUseCase(orderRepo);

export async function createOrderController(req: Request, res: Response) {
    try {
        const order = await createOrderUseCase.execute(req.body);

        io.emit('neworder', order);

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'Internal Error' });
    }
}

export async function changeOrderStatusController(req: Request, res: Response) {
    try {
        const order = await changeOrderStatusUseCase.execute(req.params.orderId, req.body.status);
        res.status(200).json(order);
    } catch(err) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'Internal Error' });
    }
}

export async function listOrderController(req: Request, res: Response) {
    try {
        const orders = await listOrderUseCase.execute();
        res.status(200).json(orders);
    } catch(err) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'Internal Error' });
    }
}

export async function deleteOrderController(req: Request, res: Response) {
    try {
        await deleteOrderUseCase.execute(req.params.orderId);
        res.status(204).send();
    } catch(err) {
        res.status(500).json({ error: err instanceof Error ? err.message: 'Internal Error' });
    }
}
