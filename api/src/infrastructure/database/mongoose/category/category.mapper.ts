import { Category } from '../../../../domain/category/category.entity';

export const CategoryMapper = {
  toEntity(doc: any): Category {
    return new Category(doc.name, doc.icon, doc._id.toString());
  },
  toPersistence(category: Category): any {
    return {
      name: category.name,
      icon: category.icon,
    };
  }
}
