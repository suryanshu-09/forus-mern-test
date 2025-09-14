"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogInput = exports.deleteInput = exports.loginInput = exports.registerInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerInput = zod_1.default.object({
    name: zod_1.default.string().min(6),
    email: zod_1.default.email(),
    password: zod_1.default.string().min(6),
});
exports.loginInput = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string().min(6),
});
exports.deleteInput = zod_1.default.object({
    email: zod_1.default.email(),
});
exports.blogInput = zod_1.default.object({
    title: zod_1.default.string().min(6),
    content: zod_1.default.string(),
    thumbnail: zod_1.default.url(),
});
