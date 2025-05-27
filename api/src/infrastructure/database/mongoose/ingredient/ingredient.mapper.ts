import { Ingredient } from '../../../../domain/ingredient/ingredient.entity';
import { Category } from '../../../../domain/category/category.entity';

export const IngredientMapper = {
  toEntity(doc: any): Ingredient | null {
    if (!doc) return null;

    return new Ingredient(
      doc.name,
      new Category(doc.category._id.toString(), doc.category.name, doc.category.icon),
      doc.description,
      doc._id.toString(),
    );
  },
  toPersistence(entity: Ingredient): any {
    return {
      name: entity.name,
      category: entity.category.id,
      description: entity.description
    };
  }
}
