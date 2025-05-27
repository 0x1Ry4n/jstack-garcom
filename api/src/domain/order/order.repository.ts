import { Order } from "./order.entity";
import { OrderStatus } from "../../application/enums/order-status.enum";

export interface IOrderRepository {
    create(order: Order): Promise<Order>;
    updateStatus(id: String, status: OrderStatus): Promise<Order>;
    delete(id: String): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    list(): Promise<Order[]>;
}