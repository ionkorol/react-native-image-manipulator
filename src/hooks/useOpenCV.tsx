import React from "react";
import { NativeModules } from "react-native";
import { Coordinates, CropResult } from "../types";

export const useOpenCV = () => {
  const perspectiveCrop = async (coords: Coordinates, file: string): Promise<string> => {
    return NativeModules.RNOpenCV.crop(coords, file);
  };

  const grayScale = async (file: string): Promise<string> => {
    return NativeModules.RNOpenCV.grayScale(file);
  };

  const blackAndWhite = async (file: string): Promise<string> => {
    return NativeModules.RNOpenCV.blackAndWhite(file);
  };

  return { perspectiveCrop, grayScale, blackAndWhite };
};
