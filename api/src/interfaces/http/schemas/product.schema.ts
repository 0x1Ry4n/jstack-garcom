import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const createProductSchema = z.object({
    name: z.string().min(8).max(50),
    category: objectId,
    description: z.string().min(30).max(200),
    imagePath: z.string().url("Caminho da imagem inválido"),
    price: z.number().positive(),
    ingredients: z.array(z.object({
        ingredient: objectId,
        quantity: z.number().positive().min(1),
        unit: z.string().min(1, "Unidade não pode estar vazia")
    }))
});

export type CreateProductData = z.infer<typeof createProductSchema>;