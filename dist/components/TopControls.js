"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopControls = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var enums_1 = require("../constants/enums");
var common_1 = require("./common");
var icons_1 = require("../assets/icons");
var TopControls = function (ctx) {
    /* ******************** Hooks ******************** */
    var _handleDoneCommand = ctx._handleDoneCommand, manipulationStage = ctx.manipulationStage, _setManipulationStage = ctx._setManipulationStage, _clearState = ctx._clearState, isLoading = ctx.isLoading;
    /* ******************** Functions ******************** */
    var handleOnPressClose = function () {
        _clearState();
    };
    var handleOnPressBack = function () {
        _setManipulationStage(enums_1.ManipulationStage.VIEW);
    };
    /* ******************** JSX ******************** */
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        manipulationStage !== enums_1.ManipulationStage.VIEW && (react_1.default.createElement(common_1.Button, { isLoading: isLoading, icon: react_1.default.createElement(icons_1.ArrowLeftIcon, null), onPress: handleOnPressBack }, "Back")),
        manipulationStage === enums_1.ManipulationStage.VIEW && (react_1.default.createElement(common_1.Button, { isLoading: isLoading, icon: react_1.default.createElement(icons_1.ArrowLeftIcon, null), onPress: handleOnPressClose }, "Close")),
        manipulationStage === enums_1.ManipulationStage.VIEW && (react_1.default.createElement(common_1.Button, { onPress: _handleDoneCommand, isLoading: isLoading, icon: react_1.default.createElement(icons_1.CheckIcon, null) }, "Done"))));
};
exports.TopControls = TopControls;
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#302e3b",
    },
});
