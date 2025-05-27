import { Ingredient } from "../../../domain/ingredient/ingredient.entity";
import { IIngredientRepository } from "../../../domain/ingredient/ingredient.repository";

export class ListIngredientUseCase {
    constructor(private readonly ingredientRepo: IIngredientRepository) {}

    async execute(): Promise<Ingredient[]> {
        return await this.ingredientRepo.list();
    }
}
