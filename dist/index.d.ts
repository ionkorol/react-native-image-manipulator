import React from "react";
interface IProps {
    children: React.ReactNode;
}
export { useImageManipulator } from "./hooks/useImageManipulator";
export declare const ImageManipulatorProvider: ({ children }: IProps) => JSX.Element;
