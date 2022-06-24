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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropArea = void 0;
var react_1 = __importDefault(require("react"));
var react_native_svg_1 = __importStar(require("react-native-svg"));
var enums_1 = require("../constants/enums");
var CropArea = function (ctx) {
    /* ******************** Hooks ******************** */
    var cropPoints = ctx.cropPoints, manipulationStage = ctx.manipulationStage, _setCropPoints = ctx._setCropPoints, cropViewDims = ctx.cropViewDims;
    /* ******************** Variables ******************** */
    var isVisible = manipulationStage === enums_1.ManipulationStage.CROP;
    /* ******************** Functions ******************** */
    var handleOnTouch = function (pointType) { return function (event) {
        var x = event.nativeEvent.locationX;
        var y = event.nativeEvent.locationY;
        var _a = event.nativeEvent, pageX = _a.pageX, pageY = _a.pageY;
        console.log(cropViewDims.y, pageY);
        if (pageX <= cropViewDims.x ||
            pageX >= cropViewDims.x + cropViewDims.width ||
            pageY <= cropViewDims.y ||
            pageY >= cropViewDims.y + cropViewDims.height) {
            return;
        }
        _setCropPoints(function (prevState) {
            var _a;
            return (prevState ? __assign(__assign({}, prevState), (_a = {}, _a[pointType] = { x: x, y: y }, _a)) : prevState);
        });
    }; };
    /* ******************** JSX ******************** */
    if (!cropPoints) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement(react_native_svg_1.default, { style: { display: isVisible ? "flex" : "none" }, height: cropViewDims.height, width: cropViewDims.width },
        react_1.default.createElement(react_native_svg_1.Polygon, { points: "\n        ".concat(cropPoints.topLeft.x, ",").concat(cropPoints.topLeft.y, " \n        ").concat(cropPoints.topRight.x, ",").concat(cropPoints.topRight.y, " \n        ").concat(cropPoints.bottomRight.x, ",").concat(cropPoints.bottomRight.y, " \n        ").concat(cropPoints.bottomLeft.x, ",").concat(cropPoints.bottomLeft.y, "\n        "), stroke: "lightblue", fill: "lightblue", fillOpacity: 0.3, strokeWidth: "2" }),
        react_1.default.createElement(react_native_svg_1.Circle, { pointerEvents: "box-only", cx: cropPoints.topLeft.x, cy: cropPoints.topLeft.y, r: "10", fill: "lightblue", onStartShouldSetResponder: function () { return true; }, onMoveShouldSetResponder: function () { return true; }, onResponderMove: handleOnTouch("topLeft") }),
        react_1.default.createElement(react_native_svg_1.Circle, { cx: cropPoints.topRight.x, cy: cropPoints.topRight.y, r: "10", fill: "lightblue", onStartShouldSetResponder: function () { return true; }, onMoveShouldSetResponder: function () { return true; }, onResponderMove: handleOnTouch("topRight") }),
        react_1.default.createElement(react_native_svg_1.Circle, { cx: cropPoints.bottomRight.x, cy: cropPoints.bottomRight.y, r: "10", fill: "lightblue", onStartShouldSetResponder: function () { return true; }, onMoveShouldSetResponder: function () { return true; }, onResponderMove: handleOnTouch("bottomRight") }),
        react_1.default.createElement(react_native_svg_1.Circle, { cx: cropPoints.bottomLeft.x, cy: cropPoints.bottomLeft.y, r: "10", fill: "lightblue", onStartShouldSetResponder: function () { return true; }, onMoveShouldSetResponder: function () { return true; }, onResponderMove: handleOnTouch("bottomLeft") })));
};
exports.CropArea = CropArea;
