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
const User_1 = __importDefault(require("../models/User"));
const apiError_1 = require("../helpers/apiError");
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return user.save();
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return User_1.default.find().populate('role').sort({ lastName: 1 });
});
const findById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findById(userId).populate('roles');
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`User ${userId} not found`);
    }
    return foundUser;
});
//=====BUG===== I get back a 404 error
// const findByEmail = async (email: string): Promise<UserDocument> => {
//   const foundUser = await User.findOne({ email })
//   if (!foundUser) {
//     throw new NotFoundError(`User ${email} not found`)
//   }
//   return foundUser
// }
const update = (userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findByIdAndUpdate(userId, update, {
        new: true,
    });
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`user ${userId} not found`);
    }
    return foundUser;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = User_1.default.findByIdAndDelete(userId);
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`User ${userId} not found`);
    }
    return foundUser;
});
exports.default = {
    create,
    findAll,
    findById,
    update,
    deleteUser,
    // findByEmail,
};
//# sourceMappingURL=user.service.js.map