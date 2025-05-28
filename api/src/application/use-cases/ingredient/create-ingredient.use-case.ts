import { Category } from "../../../domain/category/category.entity";
import { Ingredient } from "../../../domain/ingredient/ingredient.entity";
import { ICategoryRepository } from "../../../domain/category/category.repository";
import { IIngredientRepository } from "../../../domain/ingredient/ingredient.repository";
import { CreateIngredientData } from '../../../interfaces/http/schemas/ingredient.schema';

export class CreateIngredientUseCase {
    constructor(
        private readonly categoryRepo: ICategoryRepository,
        private readonly ingredientRepo: IIngredientRepository
    ) { }

    async execute(data: CreateIngredientData): Promise<Ingredient> {
        const category = await this.categoryRepo.findById(data.category);
        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        const ingredient = new Ingredient(data.name, category, data.description)
        return await this.ingredientRepo.create(ingredient);
    }
}