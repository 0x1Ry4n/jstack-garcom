import { Order } from "../../../../domain/order/order.entity";
import { Product } from "../../../../domain/product/product.entity";

export const OrderMapper = {
  toEntity(doc: any): Order | null {
    if (!doc) return null;

    const products = (doc.products || []).map((item: any) => {
      const productDoc = item.product;

      const product = new Product(
        productDoc._id?.toString() || '',
        productDoc.name,
        productDoc.description,
        productDoc.imagePath,
        productDoc.price,
        productDoc.category,
        productDoc.ingredients
      );

      return {
        product,
        quantity: item.quantity
      };
    });

    return new Order(
      doc.table,
      doc.status,
      products,
      doc._id?.toString()
    );
  },

  toPersistence(entity: Order): any {
    return {
      table: entity.table,
      status: entity.status,
      products: entity.products.map((p) => ({
        product: p.product.id,
        quantity: p.quantity
      }))
    };
  }
};
