import { Product } from "../../../../domain/product/product.entity";
import { IProductRepository } from "../../../../domain/product/product.repository";
import { ProductModel } from "./product.model";
import { ProductMapper } from "./product.mapper";

export class ProductRepositoryImpl implements IProductRepository {
    async create(product: Product): Promise<Product> {
        const raw = ProductMapper.toPersistence(product);
        const createdDoc = await ProductModel.create(raw);

        await createdDoc.populate('product');
        return ProductMapper.toEntity(createdDoc);
    }

    async findById(id: string): Promise<Product> {
        const doc = await ProductModel.findById(id).populate('product').exec();
        return ProductMapper.toEntity(doc);
    }

    async list(): Promise<Product[]> {
        const docs = await ProductModel.find().populate('product').exec();
        return docs.map(doc => ProductMapper.toEntity(doc));
    }
}