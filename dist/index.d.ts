import { Coordinates } from "./types";
export declare const perspectiveCrop: (coords: Coordinates, file: string) => Promise<string>;
export declare const grayScale: (file: string) => Promise<string>;
export declare const blackAndWhite: (file: string) => Promise<string>;
