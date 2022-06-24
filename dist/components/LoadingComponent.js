"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingComponent = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var LoadingComponent = function (_a) {
    var isLoading = _a.isLoading;
    if (isLoading) {
        return (react_1.default.createElement(react_native_1.View, { style: {
                position: "absolute",
                height: "100%",
                backgroundColor: "#00000050",
                zIndex: 999,
                width: "100%",
                justifyContent: "center",
            } },
            react_1.default.createElement(react_native_1.ActivityIndicator, { color: "red" })));
    }
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports.LoadingComponent = LoadingComponent;
