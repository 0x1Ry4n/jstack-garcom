import { Request, Response } from 'express';
import { CreateIngredientUseCase } from '../../../application/use-cases/ingredient/create-ingredient.use-case';
import { ListIngredientUseCase } from '../../../application/use-cases/ingredient/list-ingredients.use-case';
import { IngredientRepositoryImpl } from '../../../infrastructure/database/mongoose/ingredient/ingredient.repository.impl';

const ingredientRepo = new IngredientRepositoryImpl();

const createIngredientUseCase = new CreateIngredientUseCase(ingredientRepo);
const listIngredientUseCase = new ListIngredientUseCase(ingredientRepo);

export async function createIngredientController(req: Request, res: Response) {
    try {
        const ingredient = await createIngredientUseCase.execute(req.body);
        res.status(201).json(ingredient);
    } catch (err) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'Internal Error' });
    }
}

export async function listIngredientController(req: Request, res: Response) {
  try {
    const ingredients = await listIngredientUseCase.execute();
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal Error' });
  }
}