"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
function welcomeGreeting(req, res, next) {
    res.send('Hello user! Welcome to my site.');
}
router.get('/', welcomeGreeting);
exports.default = router;
