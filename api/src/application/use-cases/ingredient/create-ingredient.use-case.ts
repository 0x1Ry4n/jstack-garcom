import { Category }   from   "../../../domain/category/category.entity";
import { Ingredient } from "../../../domain/ingredient/ingredient.entity";
import { IIngredientRepository } from "../../../domain/ingredient/ingredient.repository";

interface CreateIngredientRequest {
    name: string, 
    category: Category,
    description: string
}

export class CreateIngredientUseCase {
    constructor(private readonly ingredientRepo: IIngredientRepository) {}

    async execute(data: CreateIngredientRequest): Promise<Ingredient> {
        const ingredient = new Ingredient(data.name, data.category, data.description)
        return await this.ingredientRepo.create(ingredient);
    }
}