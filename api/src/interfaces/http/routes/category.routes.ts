import { Router } from 'express';
import { createCategoryController, listCategoryController, listProductsByCategoryController } from '../controllers/category.controller';
import { createCategorySchema } from '../schemas/category.schema';
import { validateData } from '../middleware/validation.middleware';

const router = Router();

router.post('/categories', validateData(createCategorySchema), createCategoryController);
router.get('/categories/:categoryId/products', listProductsByCategoryController);
router.get('/categories', listCategoryController);

export default router;