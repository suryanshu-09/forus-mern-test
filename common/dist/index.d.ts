import z from "zod";
export declare const registerInput: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type ResgisterType = z.infer<typeof registerInput>;
export declare const loginInput: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginType = z.infer<typeof loginInput>;
export declare const deleteInput: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
export type DeleteType = z.infer<typeof deleteInput>;
export declare const blogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    thumbnail: z.ZodURL;
    tags: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type BlogInputType = z.infer<typeof blogInput>;
export declare const blogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    thumbnail: z.ZodURL;
    tags: z.ZodArray<z.ZodString>;
    _id: z.ZodString;
    author: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    __v: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type BlogType = z.infer<typeof blogSchema>;
export declare const sucRes: z.ZodObject<{
    msg: z.ZodString;
}, z.core.$strip>;
export type SucResType = z.infer<typeof sucRes>;
export declare const errRes: z.ZodObject<{
    err: z.ZodString;
}, z.core.$strip>;
export type ErrResType = z.infer<typeof errRes>;
export declare const loginSesh: z.ZodObject<{
    token: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodEmail;
    }, z.core.$strip>;
}, z.core.$strip>;
export type LoginResponse = z.infer<typeof loginSesh>;
