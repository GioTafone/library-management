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
const Book_1 = __importDefault(require("../models/Book"));
// import User, { UserDocument } from '../models/User'
const apiError_1 = require("../helpers/apiError");
const create = (book) => __awaiter(void 0, void 0, void 0, function* () {
    return book.save();
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Book_1.default.find()
        .sort({ title: 1, publishedYear: -1 })
        .populate('authors')
        .populate('borrowerId');
});
const findUserBorrows = (borrowerId) => __awaiter(void 0, void 0, void 0, function* () {
    return Book_1.default.find({ borrowerId: borrowerId }).sort({
        title: 1,
        publishedYear: -1,
    });
});
//====Types to refactor
const filterByAttribute = (queries) => __awaiter(void 0, void 0, void 0, function* () {
    return Book_1.default.find({
        $and: queries,
    }).populate('authors');
});
const findById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBook = yield Book_1.default.findById(bookId).populate('authors');
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookId} not found`);
    }
    return foundBook;
});
const findByIsbn = (bookIsbn) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBook = yield Book_1.default.find({ isbn: bookIsbn }).populate('authors');
    console.log('Book', foundBook);
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookIsbn} not found`);
    }
    return foundBook;
});
const update = (bookId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBook = yield Book_1.default.findByIdAndUpdate(bookId, update, {
        new: true,
    });
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookId} not found`);
    }
    return foundBook;
});
const borrowAndReturn = (bookId, borrow) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBook = yield Book_1.default.findByIdAndUpdate(bookId, borrow, {
        new: true,
    }).populate('borrowerId');
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookId} not found or not available`);
    }
    return foundBook;
});
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBook = Book_1.default.findByIdAndDelete(bookId);
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookId} not found`);
    }
    return foundBook;
});
exports.default = {
    create,
    findAll,
    findById,
    update,
    deleteBook,
    findByIsbn,
    filterByAttribute,
    borrowAndReturn,
    findUserBorrows,
};
//# sourceMappingURL=book.service.js.map