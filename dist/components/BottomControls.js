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
exports.BottomControls = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var enums_1 = require("../constants/enums");
var MainContext_1 = require("../../src/contexts/MainContext");
var common_1 = require("./common");
var icons_1 = require("../assets/icons");
var BottomControls = function (ctx) {
    /* ******************** Hooks ******************** */
    var _handleGrayScale = ctx._handleGrayScale, _handlePerspectiveCrop = ctx._handlePerspectiveCrop, manipulationStage = ctx.manipulationStage, _setManipulationStage = ctx._setManipulationStage, _handleBlackWhite = ctx._handleBlackWhite, isLoading = ctx.isLoading, appliedFilter = ctx.appliedFilter, _handleNoFilter = ctx._handleNoFilter;
    /* ******************** Variables ******************** */
    var containerJustifyContent = (0, react_1.useMemo)(function () {
        if (manipulationStage === enums_1.ManipulationStage.CROP) {
            return "center";
        }
        return "space-around";
    }, []);
    /* ******************** Functions ******************** */
    var handleFiltersPress = function () {
        _setManipulationStage(enums_1.ManipulationStage.FILTER);
    };
    var handleCropPress = function () {
        _setManipulationStage(enums_1.ManipulationStage.CROP);
    };
    /* ******************** JSX ******************** */
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { justifyContent: containerJustifyContent }] },
        manipulationStage === enums_1.ManipulationStage.VIEW && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(common_1.Button, { onPress: handleCropPress, icon: react_1.default.createElement(icons_1.CropIcon, null), isLoading: isLoading }, "Crop"),
            react_1.default.createElement(common_1.Button, { onPress: handleFiltersPress, icon: react_1.default.createElement(icons_1.FillIcon, null), isLoading: isLoading }, "Filters"))),
        manipulationStage === enums_1.ManipulationStage.CROP && (react_1.default.createElement(common_1.Button, { onPress: _handlePerspectiveCrop, icon: react_1.default.createElement(icons_1.CropIcon, null), isLoading: isLoading }, "Crop")),
        manipulationStage === enums_1.ManipulationStage.FILTER && (react_1.default.createElement(react_native_1.View, { style: styles.buttonGroup },
            react_1.default.createElement(common_1.Button, { style: [styles.button, appliedFilter !== MainContext_1.FILTER.NONE && styles.buttonInactive], icon: react_1.default.createElement(icons_1.DropletIcon, null), isLoading: isLoading, onPress: _handleNoFilter }, "None"),
            react_1.default.createElement(common_1.Button, { style: [styles.button, appliedFilter !== MainContext_1.FILTER.GRAY && styles.buttonInactive], icon: react_1.default.createElement(icons_1.DropletIcon, null), isLoading: isLoading, onPress: _handleGrayScale }, "Gray"),
            react_1.default.createElement(common_1.Button, { style: [styles.button, appliedFilter !== MainContext_1.FILTER.BW && styles.buttonInactive], icon: react_1.default.createElement(icons_1.DropletIcon, null), isLoading: isLoading, onPress: _handleBlackWhite }, "B/W")))));
};
exports.BottomControls = BottomControls;
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: "#302e3b",
        flexDirection: "row",
        alignItems: "center",
    },
    buttonGroup: {
        borderWidth: 1,
        borderColor: "white",
        flexDirection: "row",
        flex: 1,
    },
    button: {
        flex: 1,
        borderWidth: 1,
        borderColor: "white",
        margin: 0,
    },
    buttonInactive: {
        backgroundColor: "gray",
    },
});
