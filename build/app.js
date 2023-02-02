"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const models_1 = require("./models");
const tweetRoutes_1 = __importDefault(require("./routes/tweetRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:3001'],
};
app.use(cors(corsOptions));
//routes
app.use('/api/tweets', tweetRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use((req, res, next) => {
    res.status(405).end();
});
// syncing our database
models_1.db.sync()
    .then(() => console.log('Database synced!'))
    .catch((err) => console.log('Error syncing database'));
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
