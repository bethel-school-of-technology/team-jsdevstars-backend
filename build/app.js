"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var mysql2_1 = __importDefault(require("mysql2"));
var dbConnection = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password1!',
    database: 'projectDB',
});
dbConnection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});
var app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
var cors = require('cors');
var corsOptions = {
    origin: ['http://localhost:3001'],
};
app.use(cors(corsOptions));
// api.use for routes go here.
app.use(function (req, res, next) {
    res.status(404).end();
});
var port = 3000;
app.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
