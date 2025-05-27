import { Ingredient } from '../ingredient/ingredient.entity';

export class IngredientQuantity {
  constructor(
    public ingredient: Ingredient,
    public quantity: number,
    public unit: string
  ) {}
}