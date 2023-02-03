"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
// import articleRoutes from './routes/articleRoutes'
// import articleCommentRoutes from './routes/articleCommentRoutes'
const forumRoutes_1 = __importDefault(require("./routes/forumRoutes"));
// import forumCommentRoutes from './routes/forumCommentRoutes'
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
// routes
// app.use('/api/articles', articleRoutes);
// app.use('/api/articles', articleCommentRoutes)
app.use('/api/forum', forumRoutes_1.default);
// app.use('/api/forum', forumCommentRoutes);
app.use('/api/users', userRoutes_1.default);
app.use((req, res, next) => {
    res.status(405).end();
});
// Syncing our database
models_1.db.sync().then(() => {
    console.info("connected to the database!");
});
app.listen(3000);
