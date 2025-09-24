import z from "zod";

export const registerInput = z.object({
  name: z.string().min(6, "Name should have minimum 6 characters."),
  email: z.email("Invalid Email"),
  password: z.string().min(6, "Password should have atleast 6 characters."),
});

export type ResgisterType = z.infer<typeof registerInput>;

export const loginInput = z.object({
  email: z.email("Invalid Email"),
  password: z.string().min(6, "Password should have atleast 6 characters."),
});

export type LoginType = z.infer<typeof loginInput>;

export const deleteInput = z.object({
  email: z.email("Invalid Email"),
});

export type DeleteType = z.infer<typeof deleteInput>;

export const blogInput = z.object({
  title: z.string().min(6, "Title should have atleast 6 characters."),
  content: z.string(),
  thumbnail: z.url("Invalid URL"),
  tags: z.array(z.string()),
});

export type BlogInputType = z.infer<typeof blogInput>;

export const blogSchema = blogInput.extend({
  _id: z.string(),
  author: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number().optional(),
});

export type BlogType = z.infer<typeof blogSchema>;

export const sucRes = z.object({
  msg: z.string(),
});

export type SucResType = z.infer<typeof sucRes>;

export const errRes = z.object({
  err: z.string(),
});

export type ErrResType = z.infer<typeof errRes>;

export const loginSesh = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
  }),
});

export type LoginResponse = z.infer<typeof loginSesh>;
