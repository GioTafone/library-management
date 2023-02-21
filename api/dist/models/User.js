"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Role',
    },
    // activeBorrows: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: 'Book',
    // },
    // isBanned: {
    //   type: Boolean,
    //   required: true,
    // },
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map