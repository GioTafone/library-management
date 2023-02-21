"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/users prefix
router.get('/', user_controller_1.findAll);
router.post('/', user_controller_1.createUser);
router.get('/:userId', user_controller_1.findById);
router.put('/:userId', user_controller_1.updateUser);
router.delete('/:userId', user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.router.js.map