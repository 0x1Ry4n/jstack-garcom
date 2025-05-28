import { Product } from "../../../domain/product/product.entity";
import { IProductRepository } from "../../../domain/product/product.repository";
import { ICategoryRepository } from "../../../domain/category/category.repository";
import { IIngredientRepository } from "../../../domain/ingredient/ingredient.repository";
import { CreateProductData } from "../../../interfaces/http/schemas/product.schema";



export class CreateProductUseCase {
    constructor(
        private readonly categoryRepo: ICategoryRepository,
        private readonly ingredientRepo: IIngredientRepository,
        private readonly productRepo: IProductRepository
    ) { }

    async execute(data: CreateProductData): Promise<Product> {
        const category = await this.categoryRepo.findById(data.category);
        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        await Promise.all(
            data.ingredients.map(async (ing) => {
                const ingredientExists = await this.ingredientRepo.findById(ing.ingredient);
                if (!ingredientExists) {
                    throw new Error(`Ingrediente não encontrado: ${ing.ingredient}`);
                }
                return ingredientExists;
            })
        );

        const product = new Product(data.name, data.description, data.imagePath, data.price, category, data.ingredients);
        return await this.productRepo.create(product);
    }
}
