import { IOrderRepository } from "../../../../domain/order/order.repository";
import { Order } from "../../../../domain/order/order.entity";
import { OrderStatus } from "../../../../application/enums/order-status.enum";
import { OrderModel } from "./order.model";
import { OrderMapper } from "./order.mapper";

export class OrderRepositoryImpl implements IOrderRepository {
  async create(order: Order): Promise<Order> {
    const persistenceOrder = OrderMapper.toPersistence(order);
    const created = await OrderModel.create(persistenceOrder);
    const populated = await created.populate("products.product");
    return OrderMapper.toEntity(populated || created);
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const updated = await OrderModel.findByIdAndUpdate(id, { status }, { new: true })
      .populate("products.product");
    
    if (!updated) throw new Error("Order not found");
    return OrderMapper.toEntity(updated)!;
  }

  async delete(id: string): Promise<Order> {
    const deleted = await OrderModel.findByIdAndDelete(id).populate("products.product");
    if (!deleted) throw new Error("Order not found");
    return OrderMapper.toEntity(deleted)!;
  }

  async findById(id: string): Promise<Order | null> {
    const doc = await OrderModel.findById(id).populate("products.product");
    return OrderMapper.toEntity(doc);
  }

  async list(): Promise<Order[]> {
    const docs = await OrderModel.find().sort({ createdAt: 1 }).populate("products.product");
    return docs.map(OrderMapper.toEntity).filter((o): o is Order => !!o);
  }
}
