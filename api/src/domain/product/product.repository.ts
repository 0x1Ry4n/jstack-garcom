import { Product } from './product.entity';

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  list(): Promise<Product[]>;
}
