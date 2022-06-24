"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adjustPointsByRatios = void 0;
var adjustPointsByRatios = function (cropPoints, widthRatio, heightRatio) {
    console.log("Adjusting crop points by ratios height: ".concat(heightRatio, " width: ").concat(widthRatio));
    return {
        topLeft: {
            x: cropPoints.topLeft.x * widthRatio,
            y: cropPoints.topLeft.y * heightRatio,
        },
        topRight: {
            x: cropPoints.topRight.x * widthRatio,
            y: cropPoints.topRight.y * heightRatio,
        },
        bottomRight: {
            x: cropPoints.bottomRight.x * widthRatio,
            y: cropPoints.bottomRight.y * heightRatio,
        },
        bottomLeft: {
            x: cropPoints.bottomLeft.x * widthRatio,
            y: cropPoints.bottomLeft.y * heightRatio,
        },
    };
};
exports.adjustPointsByRatios = adjustPointsByRatios;
