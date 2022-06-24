"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageManipulatorProvider = exports.useImageManipulator = void 0;
var react_1 = __importDefault(require("react"));
var AsyncModal_1 = require("./components/AsyncModal");
var MainContext_1 = require("./contexts/MainContext");
var useImageManipulator_1 = require("./hooks/useImageManipulator");
Object.defineProperty(exports, "useImageManipulator", { enumerable: true, get: function () { return useImageManipulator_1.useImageManipulator; } });
var ImageManipulatorProvider = function (_a) {
    var children = _a.children;
    return (react_1.default.createElement(MainContext_1.MainProvider, null,
        react_1.default.createElement(AsyncModal_1.AsyncModal, null),
        children));
};
exports.ImageManipulatorProvider = ImageManipulatorProvider;
