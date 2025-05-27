import { IOrderRepository } from '../../../domain/order/order.repository';
import { Order } from '../../../domain/order/order.entity';

export class ListOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<Order[]> {
    return await this.orderRepository.list();
  }
}
