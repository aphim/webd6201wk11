"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const indexRouter = require('./Routes/index');
exports.app = express();
const DBConfig = require("./Config/db");
mongoose.connect(DBConfig.Path, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(`Connected to MongoDB at: ${DBConfig.Path}`);
});
exports.app.set('views', path.join(__dirname, 'Views'));
exports.app.set('view engine', 'ejs');
exports.app.use(logger('dev'));
exports.app.use(express.json());
exports.app.use(express.urlencoded({ extended: false }));
exports.app.use(cookieParser());
exports.app.use(express.static(path.join(__dirname, 'Client')));
exports.app.use(express.static(path.join(__dirname, 'node_modules')));
exports.app.use('/', indexRouter);
exports.app.use(function (req, res, next) {
    next(createError(404));
});
exports.app.use(function (err, req, res, next) {
    let message = err.message;
    let error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', { message: message, error: error, title: '', page: '' });
});
module.exports = exports.app;
//# sourceMappingURL=app.js.map