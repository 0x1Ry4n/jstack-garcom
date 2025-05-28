import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(8).max(50),
    icon: z.string()
});

export type CreateCategoryData = z.infer<typeof createCategorySchema>;