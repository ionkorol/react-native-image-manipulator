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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainProvider = exports.MainContext = exports.FILTER = void 0;
var react_1 = __importStar(require("react"));
var enums_1 = require("../constants/enums");
var fileUtils_1 = require("../lib/fileUtils");
var react_native_1 = require("react-native");
var dimensions_1 = require("../constants/dimensions");
var pointsUtils_1 = require("../lib/pointsUtils");
var useOpenCV_1 = require("../hooks/useOpenCV");
var FILTER;
(function (FILTER) {
    FILTER[FILTER["BW"] = 0] = "BW";
    FILTER[FILTER["GRAY"] = 1] = "GRAY";
    FILTER[FILTER["NONE"] = 2] = "NONE";
})(FILTER = exports.FILTER || (exports.FILTER = {}));
exports.MainContext = (0, react_1.createContext)({
    processImage: function () {
        return new Promise(function (res) {
            console.log("not implemented");
            res("");
        });
    },
    _setCropViewDims: undefined,
    _clearState: function () { return console.log("not implemented: _clearState"); },
    _handleDoneCommand: function () { return console.log("not implemented: _handleDoneCommand"); },
    _handlePerspectiveCrop: function () { return console.log("not implemented: _handleGrayScale"); },
    _handleGrayScale: function () { return console.log("not implemented: _handleGrayScale"); },
    _handleNoFilter: function () { return console.log("not implemented: _handleNoFilter"); },
    _handleBlackWhite: function () { return console.log("not implemented: _handleBlackWhite"); },
    _setCropPoints: function () { return console.log("not implemented: _setCropPoints"); },
    _setManipulationStage: function () { return console.log("not implemented: _setManipulationStage"); },
    appliedFilter: FILTER.NONE,
    modifiedImage: null,
    cropPoints: null,
    manipulationStage: enums_1.ManipulationStage.VIEW,
    cropViewDims: {
        width: 1,
        height: 1,
        x: 0,
        y: 0,
    },
    isLoading: false,
});
var MainProvider = function (_a) {
    var children = _a.children;
    /* ******************** Hooks ******************** */
    var openCV = (0, useOpenCV_1.useOpenCV)();
    var _b = (0, react_1.useState)(null), originalImage = _b[0], _setOriginalImage = _b[1];
    var _c = (0, react_1.useState)(null), modifiedImage = _c[0], _setModifiedImage = _c[1];
    var _d = (0, react_1.useState)(null), cropPoints = _d[0], _setCropPoints = _d[1];
    var _e = (0, react_1.useState)(enums_1.ManipulationStage.VIEW), manipulationStage = _e[0], _setManipulationStage = _e[1];
    var _f = (0, react_1.useState)({ width: 0, height: 0, x: 0, y: 0 }), cropViewDims = _f[0], _setCropViewDims = _f[1];
    var _g = (0, react_1.useState)(false), isLoading = _g[0], _setIsLoading = _g[1];
    var promiseRef = (0, react_1.useRef)(null);
    var _h = (0, react_1.useState)(FILTER.NONE), appliedFilter = _h[0], _setAppliedFilter = _h[1];
    /* ******************** Variables ******************** */
    var cropViewWidthRatio = (0, react_1.useMemo)(function () {
        if (modifiedImage) {
            return modifiedImage.width / cropViewDims.width;
        }
        return 1;
    }, [modifiedImage === null || modifiedImage === void 0 ? void 0 : modifiedImage.width, cropViewDims.width]);
    var cropViewHeightRatio = (0, react_1.useMemo)(function () {
        if (modifiedImage) {
            return modifiedImage.height / cropViewDims.height;
        }
        return 1;
    }, [modifiedImage === null || modifiedImage === void 0 ? void 0 : modifiedImage.height, cropViewDims.height]);
    /* ******************** Public Functions ******************** */
    // @ts-ignore
    var processImage = function (imgInfo) {
        return new Promise(function (resolve, reject) {
            promiseRef.current = {
                resolve: resolve,
                reject: reject,
            };
            _setOriginalImage(imgInfo.base64);
            _setModifiedImage(imgInfo);
        });
    };
    /* ******************** Internal Functions ******************** */
    var _handleModifyImage = function (base64) {
        _setModifiedImage(function (prevState) { return (prevState ? __assign(__assign({}, prevState), { base64: base64 }) : prevState); });
    };
    var _handlePerspectiveCrop = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _setIsLoading(true);
                    if (!(modifiedImage && cropPoints)) return [3 /*break*/, 4];
                    console.log("start cropping");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, openCV.perspectiveCrop((0, pointsUtils_1.adjustPointsByRatios)(cropPoints, cropViewWidthRatio, cropViewHeightRatio), modifiedImage.base64)];
                case 2:
                    data = _a.sent();
                    console.log("end cropping", data);
                    _handleModifyImage(data);
                    _setOriginalImage(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4:
                    _setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var _handleNoFilter = function () {
        _setAppliedFilter(FILTER.NONE);
        if (originalImage) {
            _handleModifyImage(originalImage);
        }
    };
    var _handleGrayScale = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _setAppliedFilter(FILTER.GRAY);
                    if (!originalImage) return [3 /*break*/, 2];
                    return [4 /*yield*/, openCV.grayScale(originalImage)];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    _handleModifyImage(data);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var _handleBlackWhite = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _setAppliedFilter(FILTER.BW);
                    if (!originalImage) return [3 /*break*/, 2];
                    return [4 /*yield*/, openCV.blackAndWhite(originalImage)];
                case 1:
                    data = _a.sent();
                    _handleModifyImage(data);
                    console.log(data);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var _clearState = function () {
        _setCropPoints(null);
        _setManipulationStage(enums_1.ManipulationStage.VIEW);
        _setIsLoading(false);
        _setModifiedImage(null);
    };
    var _handleDoneCommand = function () { return __awaiter(void 0, void 0, void 0, function () {
        var imgUri;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!modifiedImage) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, fileUtils_1.convertFromBase64ToUri)(modifiedImage.base64)];
                case 1:
                    imgUri = _b.sent();
                    (_a = promiseRef.current) === null || _a === void 0 ? void 0 : _a.resolve(imgUri);
                    _clearState();
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    /* ******************** Effects ******************** */
    (0, react_1.useEffect)(function () {
        if (modifiedImage) {
            _setCropPoints({
                topLeft: { x: dimensions_1.INITIAL_CROP_POINTS_GAP, y: dimensions_1.INITIAL_CROP_POINTS_GAP },
                topRight: {
                    x: cropViewDims.width - dimensions_1.INITIAL_CROP_POINTS_GAP,
                    y: dimensions_1.INITIAL_CROP_POINTS_GAP,
                },
                bottomRight: {
                    x: cropViewDims.width - dimensions_1.INITIAL_CROP_POINTS_GAP,
                    y: cropViewDims.height - dimensions_1.INITIAL_CROP_POINTS_GAP,
                },
                bottomLeft: {
                    x: dimensions_1.INITIAL_CROP_POINTS_GAP,
                    y: cropViewDims.height - dimensions_1.INITIAL_CROP_POINTS_GAP,
                },
            });
            console.info("Crop points were initialized");
            react_native_1.StatusBar.setHidden(true);
        }
        else {
            react_native_1.StatusBar.setHidden(false);
        }
    }, [modifiedImage, cropViewDims]);
    /* ******************** JSX ******************** */
    return (react_1.default.createElement(exports.MainContext.Provider, { value: {
            processImage: processImage,
            cropPoints: cropPoints,
            manipulationStage: manipulationStage,
            _clearState: _clearState,
            modifiedImage: modifiedImage,
            _handleGrayScale: _handleGrayScale,
            _handlePerspectiveCrop: _handlePerspectiveCrop,
            _setCropPoints: _setCropPoints,
            _setManipulationStage: _setManipulationStage,
            _handleDoneCommand: _handleDoneCommand,
            cropViewDims: cropViewDims,
            isLoading: isLoading,
            _handleBlackWhite: _handleBlackWhite,
            _setCropViewDims: _setCropViewDims,
            _handleNoFilter: _handleNoFilter,
            appliedFilter: appliedFilter,
        } }, children));
};
exports.MainProvider = MainProvider;
