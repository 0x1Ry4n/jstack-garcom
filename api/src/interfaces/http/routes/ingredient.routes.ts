import { Router } from 'express';
import { createIngredientController, listIngredientController } from '../controllers/ingredient.controller';
import { createIngredientSchema } from '../schemas/ingredient.schema';
import { validateData } from '../middleware/validation.middleware';

const router = Router();

router.post('/ingredients', validateData(createIngredientSchema), createIngredientController);
router.get('/ingredients', listIngredientController);

export default router;