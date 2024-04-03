import { z } from 'zod';

const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    //"image/png",
];

export const createEventSchema = z.object({
    title: z.string().min(1, 'Title is required').max(191),
    description: z.string().min(1, 'Description is required'),
    // file: z.instanceof(File)
    file: z.any().refine(
        (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
        "Only .jpg and .jpeg formats are supported."
    ),
});

export const createUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Name is required').email('Not valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });
;

export const loginUserSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
}); 