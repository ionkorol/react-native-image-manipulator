"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useImageManipulator = void 0;
var react_1 = require("react");
var MainContext_1 = require("../contexts/MainContext");
var useImageManipulator = function () {
    var context = (0, react_1.useContext)(MainContext_1.MainContext);
    return context;
};
exports.useImageManipulator = useImageManipulator;
