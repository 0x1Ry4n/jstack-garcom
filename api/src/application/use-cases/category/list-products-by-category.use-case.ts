import { Product } from "../../../domain/product/product.entity";
import { ICategoryRepository } from "../../../domain/category/category.repository";

export class ListProductsByCategoryUseCase {
    constructor(private readonly categoryRepo: ICategoryRepository) {}

    async execute(categoryId: string): Promise<Product[]> {
        return await this.categoryRepo.listProductsByCategory(categoryId);
    }
}