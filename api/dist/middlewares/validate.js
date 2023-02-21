"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorSchema = exports.bookSchema = void 0;
const zod_1 = require("zod");
const apiError_1 = require("../helpers/apiError");
exports.bookSchema = zod_1.z.object({
    body: zod_1.z.object({
        isbn: zod_1.z.string({ required_error: 'Isbn is required' }),
        title: zod_1.z.string({ required_error: 'Title is required' }),
        description: zod_1.z.optional(zod_1.z.string()),
        publisher: zod_1.z.optional(zod_1.z.string()),
        category: zod_1.z.optional(zod_1.z.string()),
        publishedYear: zod_1.z.string({ required_error: 'Year is required' }),
    }),
});
exports.authorSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string({ required_error: 'Fisrt Name is required' }).min(1),
    }),
});
const validate = (schema) => (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return next(new apiError_1.BadRequestError(error.issues[0].message, 400, error));
        }
        next(error);
    }
});
exports.default = validate;
//# sourceMappingURL=validate.js.map