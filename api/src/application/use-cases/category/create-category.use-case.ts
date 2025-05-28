import { Category } from '../../../domain/category/category.entity';
import { ICategoryRepository } from '../../../domain/category/category.repository';
import { CreateCategoryData } from '../../../interfaces/http/schemas/category.schema';

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(data: CreateCategoryData): Promise<Category> {
    const category = new Category(data.name, data.icon);
    return await this.categoryRepo.create(category);
  }
}
