import { z } from 'zod';

const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
];

export const createEventSchema = z.object({
    title: z.string().min(1, 'Title is required').max(191),
    description: z.string().min(1, 'Description is required'),
    // file: z.instanceof(File)
    file: z.any().refine(
        (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg and.png formats are supported."
    ),
});
