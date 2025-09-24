"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSesh = exports.errRes = exports.sucRes = exports.blogSchema = exports.blogInput = exports.deleteInput = exports.loginInput = exports.registerInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerInput = zod_1.default.object({
    name: zod_1.default.string().min(6, "Name should have minimum 6 characters."),
    email: zod_1.default.email("Invalid Email"),
    password: zod_1.default.string().min(6, "Password should have atleast 6 characters."),
});
exports.loginInput = zod_1.default.object({
    email: zod_1.default.email("Invalid Email"),
    password: zod_1.default.string().min(6, "Password should have atleast 6 characters."),
});
exports.deleteInput = zod_1.default.object({
    email: zod_1.default.email("Invalid Email"),
});
exports.blogInput = zod_1.default.object({
    title: zod_1.default.string().min(6, "Title should have atleast 6 characters."),
    content: zod_1.default.string(),
    thumbnail: zod_1.default.url("Invalid URL"),
    tags: zod_1.default.array(zod_1.default.string()),
});
exports.blogSchema = exports.blogInput.extend({
    _id: zod_1.default.string(),
    author: zod_1.default.string(),
    createdAt: zod_1.default.string(),
    updatedAt: zod_1.default.string(),
    __v: zod_1.default.number().optional(),
});
exports.sucRes = zod_1.default.object({
    msg: zod_1.default.string(),
});
exports.errRes = zod_1.default.object({
    err: zod_1.default.string(),
});
exports.loginSesh = zod_1.default.object({
    token: zod_1.default.string(),
    user: zod_1.default.object({
        id: zod_1.default.string(),
        name: zod_1.default.string(),
        email: zod_1.default.email(),
    }),
});
