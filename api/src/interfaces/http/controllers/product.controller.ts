import { Request, Response } from 'express';
import { CreateProductUseCase } from '../../../application/use-cases/product/create-product.use-case';
import { ListProductsUseCase } from '../../../application/use-cases/product/list-products.use-case';
import { ProductRepositoryImpl } from '../../../infrastructure/database/mongoose/product/product.repository.impl';

const productRepo = new ProductRepositoryImpl();

const createProductUseCase = new CreateProductUseCase(productRepo);
const listProductUseCase = new ListProductsUseCase(productRepo);

export async function createProductController(req: Request, res: Response) {
    try {
        const product = await createProductUseCase.execute(req.body);
        res.status(200).json(product);
    } catch(err) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'Internal Error' });
    }
}

export async function listProductController(req: Request, res: Response) {
    try {
        const products = await listProductUseCase.execute();
        res.status(200).json(products);
    } catch(err) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'Internal Error' });
    }
}