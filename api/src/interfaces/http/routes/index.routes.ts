import { Router } from 'express';

import categoryRoutes from './category.routes';
import ingredientRoutes from './ingredient.routes';
import productRoutes from './product.routes';
import orderRoutes from './order.routes';

const router = Router();

router.use(categoryRoutes);
router.use(ingredientRoutes);
router.use(productRoutes);
router.use(orderRoutes);

export { router };

