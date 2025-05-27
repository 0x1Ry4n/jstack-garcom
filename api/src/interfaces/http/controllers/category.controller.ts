import { Request, Response } from 'express';
import { CreateCategoryUseCase } from '../../../application/use-cases/category/create-category.use-case';
import { ListCategoryUseCase } from '../../../application/use-cases/category/list-category.use-case';
import { CategoryRepositoryImpl } from '../../../infrastructure/database/mongoose/category/category.repository.impl';
import { ListProductsByCategoryUseCase } from '../../../application/use-cases/category/list-products-by-category.use-case';

const categoryRepo = new CategoryRepositoryImpl();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepo);
const listCategoryUseCase = new ListCategoryUseCase(categoryRepo);
const listProductsByCategoryUseCase = new ListProductsByCategoryUseCase(categoryRepo);

export async function createCategoryController(req: Request, res: Response) {
  try {
    const category = await createCategoryUseCase.execute(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal Error' });
  }
}

export async function listProductsByCategoryController(req: Request, res: Response) {
  try {
    const products = await listProductsByCategoryUseCase.execute(req.params.categoryId);
    res.status(200).json(products);
  } catch(err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal Error' });
  }
}

export async function listCategoryController(req: Request, res: Response) {
  try {
    const categories = await listCategoryUseCase.execute();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal Error' });
  }
}