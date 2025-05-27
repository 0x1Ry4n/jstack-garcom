import { Ingredient } from './ingredient.entity';

export interface IIngredientRepository {
  create(ingredient: Ingredient): Promise<Ingredient>;
  findById(id: string): Promise<Ingredient | null>;
  list(): Promise<Ingredient[]>;
}
