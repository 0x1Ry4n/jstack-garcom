import { Category } from '../category/category.entity';
import { IngredientQuantity } from '../ingredient/ingredient-quantity.value-object';

export class Product {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public price: number,
    public category: Category,
    public ingredients: IngredientQuantity[],
    public id?: string | null,
  ) {}
}
