"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const validate_1 = __importStar(require("../middlewares/validate"));
const book_controller_1 = require("../controllers/book.controller");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/books prefix
router.get('/', book_controller_1.findAll);
router.post('/', (0, validate_1.default)(validate_1.bookSchema), book_controller_1.createBook);
router.get('/filter', book_controller_1.filterByAttribute);
router.get('/user/:borrowerId', book_controller_1.findUserBorrows);
router.get('/id/:bookId', book_controller_1.findById);
router.put('/id/:bookId', (0, validate_1.default)(validate_1.bookSchema), book_controller_1.updateBook);
router.delete('/id/:bookId', book_controller_1.deleteBook);
router.get('/isbn/:bookIsbn', authentication_1.default, book_controller_1.findByIsbn);
// router.put('/isbn/:bookIsbn/borrow', issueBook)
router.put('/borrow/:bookId', authentication_1.default, book_controller_1.borrowBook);
router.put('/return/:bookId', book_controller_1.returnBook);
exports.default = router;
//# sourceMappingURL=book.router.js.map