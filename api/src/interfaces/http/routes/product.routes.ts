import { Router } from 'express';
import { createProductController, listProductController } from '../controllers/product.controller';
import { createProductSchema } from '../schemas/product.schema';
import { upload } from '../middleware/multer.middleware';
import { validateData } from '../middleware/validation.middleware';

const router = Router();

router.post('/products', upload.single('image'), validateData(createProductSchema), createProductController);
router.get('/products', listProductController);

export default router;