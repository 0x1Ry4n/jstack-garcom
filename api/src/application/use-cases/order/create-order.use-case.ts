import { IOrderRepository } from "../../../domain/order/order.repository";
import { Order } from "../../../domain/order/order.entity";
import { Product } from "../../../domain/product/product.entity";

interface ProductInput {
  productId: string;
  quantity: number;
}

interface CreateOrder {
  table: string;
  products: ProductInput[];
}

export class CreateOrderUseCase {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(data: CreateOrder): Promise<Order> {
    const products = data.products.map(p => ({
      product: new Product("", "", "", 0, null!, [], p.productId),
      quantity: p.quantity
    }));

    const order = new Order(data.table, "WAITING", products);

    const createdOrder = await this.orderRepo.create(order);

    return createdOrder;
  }
}
