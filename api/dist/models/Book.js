"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    isbn: {
        type: String,
    },
    title: {
        type: String,
    },
    description: String,
    publisher: String,
    authors: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Author',
    },
    category: String,
    isAvailable: {
        type: Boolean,
        default: true,
    },
    borrowerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    publishedYear: {
        type: String,
    },
    // borrowDate: {
    //   type: Date,
    // },
    // returnDate: Date,
    //   rating: {
    //     type: Number,
    //     min: 0,
    //   },
});
exports.default = mongoose_1.default.model('Book', bookSchema);
//# sourceMappingURL=Book.js.map