"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncModal = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var EditorView_1 = require("./EditorView");
var MainContext_1 = require("../contexts/MainContext");
var TopControls_1 = require("./TopControls");
var BottomControls_1 = require("./BottomControls");
var LoadingComponent_1 = require("./LoadingComponent");
var AsyncModal = function () {
    /* ******************** Hooks ******************** */
    var ctx = (0, react_1.useContext)(MainContext_1.MainContext);
    var modifiedImage = ctx.modifiedImage, isLoading = ctx.isLoading;
    /* ******************** Variables ******************** */
    var isOpen = Boolean(modifiedImage);
    /* ******************** JSX ******************** */
    if (!isOpen) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement(react_native_1.Modal, { visible: isOpen, style: { backgroundColor: "gray" } },
        react_1.default.createElement(LoadingComponent_1.LoadingComponent, { isLoading: isLoading }),
        react_1.default.createElement(react_native_1.SafeAreaView, { style: { flex: 1, backgroundColor: "transparent" } },
            react_1.default.createElement(TopControls_1.TopControls, __assign({}, ctx)),
            react_1.default.createElement(EditorView_1.EditorView, __assign({}, ctx)),
            react_1.default.createElement(BottomControls_1.BottomControls, __assign({}, ctx)))));
};
exports.AsyncModal = AsyncModal;
