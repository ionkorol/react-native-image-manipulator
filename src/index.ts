import { NativeModules } from "react-native";
import { Coordinates } from "./types";

export const perspectiveCrop = async (coords: Coordinates, file: string): Promise<string> => {
  return NativeModules.RNOpenCV.crop(coords, file);
};

export const grayScale = async (file: string): Promise<string> => {
  return NativeModules.RNOpenCV.grayScale(file);
};

export const blackAndWhite = async (file: string): Promise<string> => {
  return NativeModules.RNOpenCV.blackAndWhite(file);
};
