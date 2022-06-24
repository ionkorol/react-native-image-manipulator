import { Coordinates } from "../types";
export declare const useOpenCV: () => {
    perspectiveCrop: (coords: Coordinates, file: string) => Promise<string>;
    grayScale: (file: string) => Promise<string>;
    blackAndWhite: (file: string) => Promise<string>;
};
