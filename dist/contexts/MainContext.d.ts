import React from "react";
import { ManipulationStage } from "../constants/enums";
import { Points, OriginalImage } from "../types";
export declare enum FILTER {
    BW = 0,
    GRAY = 1,
    NONE = 2
}
export interface IMainContext {
    processImage: (imgInfo: OriginalImage) => Promise<string>;
    _clearState: () => void;
    _setCropViewDims?: (size: Bounds) => void;
    _handlePerspectiveCrop: () => void;
    _handleGrayScale: () => void;
    _handleNoFilter: () => void;
    _handleBlackWhite: () => void;
    _handleDoneCommand: () => void;
    _setCropPoints: React.Dispatch<React.SetStateAction<Points | null>>;
    _setManipulationStage: React.Dispatch<React.SetStateAction<ManipulationStage>>;
    modifiedImage: OriginalImage | null;
    cropPoints: Points | null;
    manipulationStage: ManipulationStage;
    cropViewDims: Bounds;
    isLoading: boolean;
    appliedFilter: FILTER;
}
export declare const MainContext: React.Context<IMainContext>;
interface IProviderProps {
    children: React.ReactNode;
}
interface Bounds {
    width: number;
    height: number;
    x: number;
    y: number;
}
export declare const MainProvider: ({ children }: IProviderProps) => JSX.Element;
export {};
