import z from "zod";

export const registerInput = z.object({
  name: z.string().min(6),
  email: z.email(),
  password: z.string().min(6),
});

export type ResgisterType = z.infer<typeof registerInput>;

export const loginInput = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginType = z.infer<typeof loginInput>;

export const deleteInput = z.object({
  email: z.email(),
});

export type DeleteType = z.infer<typeof deleteInput>;

export const blogInput = z.object({
  title: z.string().min(6),
  content: z.string(),
  thumbnail: z.url(),
});

export type BlogType = z.infer<typeof blogInput>;
