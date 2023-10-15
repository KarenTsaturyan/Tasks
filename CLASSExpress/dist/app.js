"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const loggerMiddleware = (req, res, next) => {
    const log = req.body.log; //express.json
    if (log) {
        next();
        console.log(`[${new Date()}] ${req.method} ${req.url}`);
    }
    else {
        next(new Error('log is not '));
    }
    console.log('I am still in flow');
    next();
};
const authMiddleware = (req, res, next) => {
    const apiKey = req.get('api-key');
    if (apiKey === '123') {
        next();
    }
    else {
        res.status(401).send('Invalid Key');
    }
};
const ErrorHandler = () => {
};
// app.use(authMiddleware)
app.get('/', (req, res) => {
    res.send('Hello from express');
});
app.get('/protected', loggerMiddleware, authMiddleware, (req, res) => {
    res.send('Protected');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`our server on ${port}`);
});
