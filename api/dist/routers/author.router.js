"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_controller_1 = require("../controllers/author.controller");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/authors prefix
router.get('/', author_controller_1.findAllAuthors);
router.post('/', author_controller_1.createAuthor);
router.get('/id/:authorId', author_controller_1.findAuthorById);
router.put('/id/:authorId', author_controller_1.updateAuthor);
router.delete('/id/:authorId', author_controller_1.deleteAuthors);
exports.default = router;
//# sourceMappingURL=author.router.js.map