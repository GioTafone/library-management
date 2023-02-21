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
exports.deleteUser = exports.updateUser = exports.findById = exports.createUser = exports.findAll = void 0;
const User_1 = __importDefault(require("../models/User"));
const user_service_1 = __importDefault(require("../services/user.service"));
const apiError_1 = require("../helpers/apiError");
// GET /users
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_service_1.default.findAll());
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
// POST /users
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, userName, email } = req.body;
        const user = new User_1.default({
            firstName,
            lastName,
            userName,
            email,
        });
        yield user_service_1.default.create(user);
        res.json(user);
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
exports.createUser = createUser;
// GET /users/:userId
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_service_1.default.findById(req.params.userId));
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
// PUT /users/:userId
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const userId = req.params.userId;
        const updatedUser = yield user_service_1.default.update(userId, update);
        res.json(updatedUser);
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
exports.updateUser = updateUser;
// DELETE /users/:userId
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_service_1.default.deleteUser(req.params.userId);
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
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map