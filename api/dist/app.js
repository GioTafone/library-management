"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import session from 'express-session'
// import cookieParser from 'cookie-parser'
const passport_1 = __importDefault(require("passport"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const apiContentType_1 = __importDefault(require("./middlewares/apiContentType"));
const book_router_1 = __importDefault(require("./routers/book.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const author_router_1 = __importDefault(require("./routers/author.router"));
const google_1 = __importDefault(require("./passport/google"));
const secrets_1 = require("./util/secrets");
const Role_1 = __importDefault(require("./models/Role"));
dotenv_1.default.config({ path: '.env' });
const app = (0, express_1.default)();
// Express configuration
app.set('port', process.env.PORT);
// Global middleware
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(apiContentType_1.default);
app.use(express_1.default.json());
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.session())
*/
app.use(passport_1.default.initialize());
passport_1.default.use((0, google_1.default)());
// Set up routers
app.use('/api/v1/books', book_router_1.default);
app.use('/api/v1/users', user_router_1.default);
app.use('/api/v1/authors', author_router_1.default);
//the route below is for simplicity, need to create a separete Auth Route and handling things there
//pass the passport.authenticate as middleware and the strategy, in this case google-id-token
app.post('/api/v1/login', passport_1.default.authenticate('google-id-token', { session: false }), (req, res) => {
    //=====Type to refactor==== Extend class???
    //==== User Document Type=====
    const user = req.user;
    //generates the token to give to user
    const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email, role: user.role }, secrets_1.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.json({ token });
});
app.post('/api/v1/role', (req, res) => {
    const role = new Role_1.default({
        roleName: 'ADMIN',
        permissions: ['BOOK_READ', 'BOOK_DELETE', 'BOOK_UPDATE', 'BOOK_CREATE'],
    });
    role.save();
    res.json({ role });
});
// Custom API error handler
app.use(apiErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map