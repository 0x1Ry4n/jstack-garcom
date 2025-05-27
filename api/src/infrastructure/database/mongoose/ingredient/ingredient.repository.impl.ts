import { Ingredient } from '../../../../domain/ingredient/ingredient.entity';
import { IIngredientRepository } from '../../../../domain/ingredient/ingredient.repository';
import { IngredientModel } from  './ingredient.model';
import { IngredientMapper } from './ingredient.mapper';

export class IngredientRepositoryImpl implements IIngredientRepository {
  async create(ingredient: Ingredient): Promise<Ingredient> {
    const raw = IngredientMapper.toPersistence(ingredient);
    const createdDoc = await IngredientModel.create(raw);
    
    await createdDoc.populate('category');
    return IngredientMapper.toEntity(createdDoc);
  }

  async findById(id: string): Promise<Ingredient | null> {
    const doc = await IngredientModel.findById(id).populate('category').exec();
    return IngredientMapper.toEntity(doc);
  }

  async list(): Promise<Ingredient[]> {
    const docs = await IngredientModel.find().populate('category').exec();
    return docs.map(doc => IngredientMapper.toEntity(doc)!);
  }
}
