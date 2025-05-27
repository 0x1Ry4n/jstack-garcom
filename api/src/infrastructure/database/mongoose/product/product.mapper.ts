import { Product } from "../../../../domain/product/product.entity";
import { Category } from "../../../../domain/category/category.entity";
import { IngredientQuantity } from "../../../../domain/ingredient/ingredient-quantity.value-object";

export const ProductMapper = {
  toEntity(doc: any): Product | null {
    if (!doc) return null;

    const category = doc.category
      ? new Category(
          doc.category._id.toString(),
          doc.category.name,
          doc.category.icon
        )
      : null;

    const ingredients: IngredientQuantity[] = (doc.ingredients || []).map((item: any) => {
      return new IngredientQuantity(
        item.ingredient._id.toString(),
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
      doc._id?.toString() ?? null,
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
