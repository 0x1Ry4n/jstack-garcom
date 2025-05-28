import { Product } from '../../../../domain/product/product.entity';
import { ProductModel } from '../product/product.model';
import { Category } from '../../../../domain/category/category.entity';
import { CategoryModel } from './category.model';
import { ICategoryRepository } from '../../../../domain/category/category.repository';
import { CategoryMapper } from './category.mapper';
import { ProductMapper } from '../product/product.mapper';

export class CategoryRepositoryImpl implements ICategoryRepository {
  async create(category: Category): Promise<Category> {
    const created = await CategoryModel.create(CategoryMapper.toPersistence(category));
    return CategoryMapper.toEntity(created);
  }

  async list(): Promise<Category[]> {
    const categories = await CategoryModel.find();
    return categories.map((doc) => CategoryMapper.toEntity(doc));
  }

  async findById(id: string): Promise<Category> {
    const category = await CategoryModel.findById(id);
    return CategoryMapper.toEntity(category);
  }

  async listProductsByCategory(categoryId: String): Promise<Product[]> {
    const products = await ProductModel.where('category', categoryId);

    return products.map((doc) => ProductMapper.toEntity(doc));
  }
}
