import { z } from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const createIngredientSchema = z.object({
    name: z.string().min(8).max(50),
    category: objectId,
    description: z.string().min(30).max(200).optional()
});