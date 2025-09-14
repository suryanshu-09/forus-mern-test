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
}, z.core.$strip>;
export type BlogType = z.infer<typeof blogInput>;
