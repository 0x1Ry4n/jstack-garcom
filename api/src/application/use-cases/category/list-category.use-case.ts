import { Category } from "../../../domain/category/category.entity";
import { ICategoryRepository } from "../../../domain/category/category.repository";

export class ListCategoryUseCase {
    constructor(private readonly categoryRepo: ICategoryRepository) {}

    async execute(): Promise<Category[]> {
        return await this.categoryRepo.list();
    }
}