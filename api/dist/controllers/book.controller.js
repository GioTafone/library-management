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
exports.returnBook = exports.borrowBook = exports.issueBook = exports.filterByAttribute = exports.findByIsbn = exports.deleteBook = exports.updateBook = exports.findById = exports.createBook = exports.findUserBorrows = exports.findAll = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const book_service_1 = __importDefault(require("../services/book.service"));
const apiError_1 = require("../helpers/apiError");
// GET /books
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield book_service_1.default.findAll());
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
exports.findAll = findAll;
// GET /books/:borrowerId
const findUserBorrows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield book_service_1.default.findUserBorrows(req.params.borrowerId));
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
exports.findUserBorrows = findUserBorrows;
// POST /books
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isbn, title, description, publisher, authors, category, isAvailable, borrowerId, publishedYear, borrowDate, returnDate, } = req.body;
        // const Book = z.object({
        //   isbn: z.number(),
        //   title: z.string(),
        //   description: z.string()
        //   publisher: z.string(),
        // })
        const book = new Book_1.default({
            isbn,
            title,
            description,
            publisher,
            authors,
            category,
            isAvailable,
            borrowerId,
            publishedYear,
            borrowDate,
            returnDate,
        });
        yield book_service_1.default.create(book);
        res.json(book);
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
exports.createBook = createBook;
// GET /books/id/:bookId
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield book_service_1.default.findById(req.params.bookId));
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
exports.findById = findById;
// PUT /books/id/:bookId
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const bookId = req.params.bookId;
        const updatedBook = yield book_service_1.default.update(bookId, update);
        res.json(updatedBook);
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
exports.updateBook = updateBook;
// DELETE /books/id/:bookId
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_service_1.default.deleteBook(req.params.bookId);
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
exports.deleteBook = deleteBook;
// GET /books/isbn/:bookIsbn
const findByIsbn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield book_service_1.default.findByIsbn(req.params.bookIsbn));
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
exports.findByIsbn = findByIsbn;
// GET /books/filter?
const filterByAttribute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = [];
        const allowedQueries = [
            'title',
            'authors',
            'isAvailable',
            'category',
            'publishedYear',
            //to check the line below
            'authors.lastName',
        ];
        for (const key in req.query) {
            const value = req.query[key];
            const isAllowedKey = allowedQueries.includes(key);
            if (isAllowedKey) {
                queries.push({ [key]: value });
            }
        }
        console.log(queries);
        res.json(yield book_service_1.default.filterByAttribute(queries));
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
exports.filterByAttribute = filterByAttribute;
// PUT /books/isbn/:bookIsbn/borrow
const issueBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow = {
            borrowerId: req.body.borrowerId,
            isAvailable: false,
        };
        const bookIsbn = req.params.bookIsbn;
        const borrowedBook = yield book_service_1.default.borrowAndReturn(bookIsbn, borrow);
        res.json(borrowedBook);
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
exports.issueBook = issueBook;
// PUT /books/borrow/:bookId
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow = {
            borrowerId: req.body.borrowerId,
            isAvailable: false,
        };
        const bookId = req.params.bookId;
        const borrowedBook = yield book_service_1.default.borrowAndReturn(bookId, borrow);
        res.json(borrowedBook);
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
exports.borrowBook = borrowBook;
// PUT /books/return/:bookId
const returnBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow = {
            borrowerId: null,
            isAvailable: true,
        };
        const bookId = req.params.bookId;
        const borrowedBook = yield book_service_1.default.borrowAndReturn(bookId, borrow);
        res.json(borrowedBook);
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
exports.returnBook = returnBook;
//# sourceMappingURL=book.controller.js.map