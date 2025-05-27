import { Category } from '../../../domain/category/category.entity';
import { ICategoryRepository } from '../../../domain/category/category.repository';

interface CreateCategoryRequest {
  name: string;
  icon: string;
}

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(data: CreateCategoryRequest): Promise<Category> {
    const category = new Category(data.name, data.icon);
    return await this.categoryRepo.create(category);
  }
}
