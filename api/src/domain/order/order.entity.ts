import { Product } from '../product/product.entity';

export type OrderStatus = 'WAITING' | 'IN_PRODUCTION' | 'DONE';

export class OrderProduct {
  constructor(
    public product: Product,
    public quantity: number
  ) {}
}

export class Order {
  constructor(
      public table: string,
      public status: OrderStatus,
      public products: OrderProduct[],
      public id?: string | null,
  ) {}
}
