import { IOrderRepository } from '../../../domain/order/order.repository';
import { OrderStatus } from '../../enums/order-status.enum';

export class ChangeOrderStatusUseCase {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(orderId: string, status: OrderStatus): Promise<void> {
    const validStatuses: string[] = Object.values(OrderStatus);
    
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid Status. Valid Status: ${validStatuses.join(', ')}`);
    }

    await this.orderRepo.updateStatus(orderId, status);
  }
}
