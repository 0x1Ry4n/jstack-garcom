import { Order } from "../../../domain/order/order.entity";
import { IOrderRepository } from "../../../domain/order/order.repository";

export class DeleteOrderUseCase {
    constructor(private readonly orderRepo: IOrderRepository) {}

    async execute(id: string): Promise<Order> {
        return await this.orderRepo.delete(id);
    }
}