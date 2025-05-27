import { Category } from '../category/category.entity';

export class Ingredient {
  constructor(
    public name: string,
    public category: Category,
    public description?: string,
    public id?: string | null
  ) {}
}
