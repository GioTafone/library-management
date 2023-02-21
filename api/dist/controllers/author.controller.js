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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthors = exports.updateAuthor = exports.findAuthorById = exports.createAuthor = exports.findAllAuthors = void 0;
const Author_1 = __importDefault(require("../models/Author"));
const author_service_1 = __importDefault(require("../services/author.service"));
const apiError_1 = require("../helpers/apiError");
// GET /authors
const findAllAuthors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield author_service_1.default.findAll());
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', 400, error));
        }
        else {
            next(error);
        }
    }
});
exports.findAllAuthors = findAllAuthors;
// POST /authors
const createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, books } = req.body;
        const author = new Author_1.default({
            firstName,
            lastName,
            books,
        });
        yield author_service_1.default.create(author);
        res.json(author);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', 400, error));
        }
        else {
            next(error);
        }
    }
});
exports.createAuthor = createAuthor;
// GET /authors/id/:auhtorId
const findAuthorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield author_service_1.default.findById(req.params.authorId));
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', 400, error));
        }
        else {
            next(error);
        }
    }
});
exports.findAuthorById = findAuthorById;
// PUT /authors/id/:auhtorId
const updateAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const authorId = req.params.authorId;
        const updateAuthor = yield author_service_1.default.update(authorId, update);
        res.json(updateAuthor);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', 400, error));
        }
        else {
            next(error);
        }
    }
});
exports.updateAuthor = updateAuthor;
// DELETE /authors/id/:auhtorId
const deleteAuthors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield author_service_1.default.deleteAuthor(req.params.authorId);
        res.status(204).end();
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', 400, error));
        }
        else {
            next(error);
        }
    }
});
exports.deleteAuthors = deleteAuthors;
//# sourceMappingURL=author.controller.js.map