import { Category } from './category.entity';
import { Product } from '../product/product.entity';

export interface ICategoryRepository {
  create(category: Category): Promise<Category>;
  list(): Promise<Category[]>;
  listProductsByCategory(categoryId: String): Promise<Product[]>;
}
