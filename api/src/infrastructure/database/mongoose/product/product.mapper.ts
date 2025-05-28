import { Product } from "../../../../domain/product/product.entity";
import { Category } from "../../../../domain/category/category.entity";
import { IngredientQuantity } from "../../../../domain/ingredient/ingredient-quantity.value-object";

export const ProductMapper = {
  toEntity(doc: any): Product | null {
    if (!doc) return null;

    const category = doc.category
      ? new Category(
        doc.category.name,
        doc.category.icon,
        doc.category.id.toString(),
        )
      : null;

    const ingredients: IngredientQuantity[] = (doc.ingredients || []).map((item: any) => {
      return new IngredientQuantity(
        item.ingredient,
        item.quantity,
        item.unit
      );
    });

    return new Product(
      doc.name,
      doc.description,
      doc.imagePath,
      doc.price,
      category!,
      ingredients,
      doc.id?.toString() ?? null,
    );
  },

  toPersistence(entity: Product): any {
    return {
      name: entity.name,
      description: entity.description,
      imagePath: entity.imagePath,
      price: entity.price,
      category: entity.category.id,
      ingredients: entity.ingredients.map(iq => ({
        ingredient: iq.ingredient.id,
        quantity: iq.quantity,
        unit: iq.unit
      }))
    };
  }
};
