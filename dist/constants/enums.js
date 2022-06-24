"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManipulationStage = exports.FunctionName = void 0;
var FunctionName;
(function (FunctionName) {
    FunctionName["perspectiveCrop"] = "perspectiveCrop";
    FunctionName["grayScale"] = "grayScale";
    FunctionName["findCorners"] = "findCorners";
})(FunctionName = exports.FunctionName || (exports.FunctionName = {}));
var ManipulationStage;
(function (ManipulationStage) {
    ManipulationStage[ManipulationStage["CROP"] = 0] = "CROP";
    ManipulationStage[ManipulationStage["FILTER"] = 1] = "FILTER";
    ManipulationStage[ManipulationStage["VIEW"] = 2] = "VIEW";
})(ManipulationStage = exports.ManipulationStage || (exports.ManipulationStage = {}));
