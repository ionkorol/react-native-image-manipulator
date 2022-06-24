"use strict";
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
exports.CropIcon = void 0;
var React = __importStar(require("react"));
var react_native_svg_1 = __importStar(require("react-native-svg"));
var CropIcon = function () { return (React.createElement(react_native_svg_1.default, { viewBox: "0 0 512 512" },
    React.createElement(react_native_svg_1.Path, { d: "M448 384h32c17.7 0 32 14.3 32 32s-14.3 32-32 32h-32v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V173.3L173.3 384H352v64H128c-35.35 0-64-28.7-64-64V128H32c-17.67 0-32-14.3-32-32 0-17.67 14.33-32 32-32h32V32C64 14.33 78.33 0 96 0c17.7 0 32 14.33 32 32v306.7L338.7 128H160V64h242.7l54.7-54.628c12.5-12.496 32.7-12.496 45.2 0 12.5 12.498 12.5 32.758 0 45.258L448 109.3V384z" }))); };
exports.CropIcon = CropIcon;
