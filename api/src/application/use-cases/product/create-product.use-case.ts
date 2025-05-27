import { Category } from "../../../domain/category/category.entity";
import { Product } from "../../../domain/product/product.entity";
import { IngredientQuantity } from "../../../domain/ingredient/ingredient-quantity.value-object";
import { IProductRepository } from "../../../domain/product/product.repository";

interface CreateProductRequest {
    name: string;
    description: string; 
    imagePath: string; 
    price: number;
    category: Category;
    ingredients: IngredientQuantity[];
}

export class CreateProductUseCase {
    constructor(private readonly productRepo: IProductRepository) {}

    async execute(data: CreateProductRequest): Promise<Product> {
        const product = new Product(data.name, data.description, data.imagePath, data.price, data.category, data.ingredients);
        return await this.productRepo.create(product);
    }
}
