import * as z from "zod";

export const bookSchema = z.object({
  body: z.object({
    _id: z.optional(z.string()),
    isbn: z.string().min(1).max(5),
    title: z.string().min(1),
    authors: z.optional(z.string()),
    publisher: z.optional(z.string()),
    description: z.optional(z.string()),
    category: z.string(),
    publishedYear: z.string().min(4).max(4),
  }),
});

export const authorSchema = z.object({
  body: z.object({
    _id: z.optional(z.string()),
    firstName: z.optional(z.string().min(1)),
    lastName: z.optional(z.string().min(1)),
  }),
});

export type BookFormData = z.infer<typeof bookSchema>;
export type AuthorFormData = z.infer<typeof authorSchema>;
