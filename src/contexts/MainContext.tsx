import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import { ManipulationStage } from "../constants/enums";
import { Points, OriginalImage, PromiseRef } from "../types";
import { convertFromBase64ToUri } from "../lib/fileUtils";
import { StatusBar } from "react-native";
import { INITIAL_CROP_POINTS_GAP } from "../constants/dimensions";
import { adjustPointsByRatios } from "../lib/pointsUtils";
import { useOpenCV } from "../hooks/useOpenCV";

export enum FILTER {
  BW,
  GRAY,
  NONE,
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

export const MainContext = createContext<IMainContext>({
  processImage: () => {
    return new Promise((res) => {
      console.log("not implemented");
      res("");
    });
  },
  _setCropViewDims: undefined,
  _clearState: () => console.log("not implemented: _clearState"),
  _handleDoneCommand: () => console.log("not implemented: _handleDoneCommand"),
  _handlePerspectiveCrop: () => console.log("not implemented: _handleGrayScale"),
  _handleGrayScale: () => console.log("not implemented: _handleGrayScale"),
  _handleNoFilter: () => console.log("not implemented: _handleNoFilter"),
  _handleBlackWhite: () => console.log("not implemented: _handleBlackWhite"),
  _setCropPoints: () => console.log("not implemented: _setCropPoints"),
  _setManipulationStage: () => console.log("not implemented: _setManipulationStage"),
  appliedFilter: FILTER.NONE,
  modifiedImage: null,
  cropPoints: null,
  manipulationStage: ManipulationStage.VIEW,
  cropViewDims: {
    width: 1,
    height: 1,
    x: 0,
    y: 0,
  },
  isLoading: false,
});

interface IProviderProps {
  children: React.ReactNode;
}

interface Bounds {
  width: number;
  height: number;
  x: number;
  y: number;
}

export const MainProvider = ({ children }: IProviderProps) => {
  /* ******************** Hooks ******************** */
  const openCV = useOpenCV();
  const [originalImage, _setOriginalImage] = useState<string | null>(null);
  const [modifiedImage, _setModifiedImage] = useState<OriginalImage | null>(null);
  const [cropPoints, _setCropPoints] = useState<Points | null>(null);
  const [manipulationStage, _setManipulationStage] = useState<ManipulationStage>(ManipulationStage.VIEW);
  const [cropViewDims, _setCropViewDims] = useState<Bounds>({ width: 0, height: 0, x: 0, y: 0 });
  const [isLoading, _setIsLoading] = useState(false);
  const promiseRef = useRef<PromiseRef | null>(null);
  const [appliedFilter, _setAppliedFilter] = useState(FILTER.NONE);

  /* ******************** Variables ******************** */
  const cropViewWidthRatio = useMemo(() => {
    if (modifiedImage) {
      return modifiedImage.width / cropViewDims.width;
    }
    return 1;
  }, [modifiedImage?.width, cropViewDims.width]);

  const cropViewHeightRatio = useMemo(() => {
    if (modifiedImage) {
      return modifiedImage.height / cropViewDims.height;
    }
    return 1;
  }, [modifiedImage?.height, cropViewDims.height]);

  /* ******************** Public Functions ******************** */
  // @ts-ignore
  const processImage = (imgInfo: OriginalImage): Promise<string> => {
    return new Promise((resolve, reject) => {
      promiseRef.current = {
        resolve,
        reject,
      };
      _setOriginalImage(imgInfo.base64);
      _setModifiedImage(imgInfo);
    });
  };

  /* ******************** Internal Functions ******************** */
  const _handleModifyImage = (base64: string) => {
    _setModifiedImage((prevState) => (prevState ? { ...prevState, base64 } : prevState));
  };

  const _handlePerspectiveCrop = async () => {
    _setIsLoading(true);
    if (modifiedImage && cropPoints) {
      console.log("start cropping");
      try {
        const data = await openCV.perspectiveCrop(adjustPointsByRatios(cropPoints, cropViewWidthRatio, cropViewHeightRatio), modifiedImage.base64);
        console.log("end cropping", data);
        _handleModifyImage(data);
        _setOriginalImage(data);
      } catch (error) {
        console.log(error);
      }
    }
    _setIsLoading(false);
  };

  const _handleNoFilter = () => {
    _setAppliedFilter(FILTER.NONE);
    if (originalImage) {
      _handleModifyImage(originalImage);
    }
  };

  const _handleGrayScale = async () => {
    _setAppliedFilter(FILTER.GRAY);

    if (originalImage) {
      const data = await openCV.grayScale(originalImage);
      console.log(data);
      _handleModifyImage(data);
    }
  };

  const _handleBlackWhite = async () => {
    _setAppliedFilter(FILTER.BW);
    if (originalImage) {
      const data = await openCV.blackAndWhite(originalImage);
      _handleModifyImage(data);
      console.log(data);
    }
  };

  const _clearState = () => {
    _setCropPoints(null);
    _setManipulationStage(ManipulationStage.VIEW);
    _setIsLoading(false);
    _setModifiedImage(null);
  };

  const _handleDoneCommand = async () => {
    if (modifiedImage) {
      const imgUri = await convertFromBase64ToUri(modifiedImage.base64);
      promiseRef.current?.resolve(imgUri);
      _clearState();
    }
  };

  /* ******************** Effects ******************** */
  useEffect(() => {
    if (modifiedImage) {
      _setCropPoints({
        topLeft: { x: INITIAL_CROP_POINTS_GAP, y: INITIAL_CROP_POINTS_GAP },
        topRight: {
          x: cropViewDims.width - INITIAL_CROP_POINTS_GAP,
          y: INITIAL_CROP_POINTS_GAP,
        },
        bottomRight: {
          x: cropViewDims.width - INITIAL_CROP_POINTS_GAP,
          y: cropViewDims.height - INITIAL_CROP_POINTS_GAP,
        },
        bottomLeft: {
          x: INITIAL_CROP_POINTS_GAP,
          y: cropViewDims.height - INITIAL_CROP_POINTS_GAP,
        },
      });
      console.info(`Crop points were initialized`);
      StatusBar.setHidden(true);
    } else {
      StatusBar.setHidden(false);
    }
  }, [modifiedImage, cropViewDims]);

  /* ******************** JSX ******************** */
  return (
    <MainContext.Provider
      value={{
        processImage,
        cropPoints,
        manipulationStage,
        _clearState,
        modifiedImage,
        _handleGrayScale,
        _handlePerspectiveCrop,
        _setCropPoints,
        _setManipulationStage,
        _handleDoneCommand,
        cropViewDims,
        isLoading,
        _handleBlackWhite,
        _setCropViewDims,
        _handleNoFilter,
        appliedFilter,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
