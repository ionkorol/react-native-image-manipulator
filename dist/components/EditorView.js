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
exports.EditorView = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var dimensions_1 = require("../constants/dimensions");
var CropArea_1 = require("./CropArea");
var files_1 = require("../constants/files");
var EditorView = function (ctx) {
    /* ******************** Hooks ******************** */
    var modifiedImage = ctx.modifiedImage, _setCropViewDims = ctx._setCropViewDims;
    var imgRef = (0, react_1.useRef)(null);
    /* ******************** JSX ******************** */
    return (react_1.default.createElement(react_native_1.View, { ref: imgRef, style: { flex: 1, margin: dimensions_1.EDITOR_VIEW_GAP, borderWidth: 1 }, onLayout: function (e) {
            if (imgRef.current) {
                imgRef.current.measure(function (x, y, width, height, pageX, pageY) { return _setCropViewDims && _setCropViewDims({ x: x, y: y, width: width, height: height }); });
            }
        } },
        react_1.default.createElement(react_native_1.ImageBackground, { source: { uri: "".concat(files_1.BASE64_PREFIX).concat(modifiedImage === null || modifiedImage === void 0 ? void 0 : modifiedImage.base64) }, style: { flex: 1 }, resizeMode: "stretch" },
            react_1.default.createElement(CropArea_1.CropArea, __assign({}, ctx)))));
};
exports.EditorView = EditorView;
