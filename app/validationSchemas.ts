import { z } from 'zod';

export const createEventSchema = z.object({
    title: z.string().min(1, 'Title is required').max(191),
    description: z.string().min(1, 'Description is required')
});
