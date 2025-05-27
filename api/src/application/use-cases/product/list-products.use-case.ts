import { IProductRepository } from "../../../domain/product/product.repository";
import { Product } from "../../../domain/product/product.entity";

export class ListProductsUseCase {
    constructor(private readonly productRepo: IProductRepository) {}

    async execute(): Promise<Product[]> {
        return await this.productRepo.list();
    }
}