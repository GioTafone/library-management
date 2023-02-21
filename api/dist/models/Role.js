"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const types_1 = require("../types");
const chema = new mongoose_1.default.Schema({
    roleName: {
        type: String,
        required: true,
        default: 'USER',
    },
    permissions: {
        type: [String],
        enum: Object.values(types_1.Permission),
        default: [types_1.Permission.BOOK_READ],
        required: true,
    },
});
exports.default = mongoose_1.default.model('Role', roleSchema);
//# sourceMappingURL=Role.js.map