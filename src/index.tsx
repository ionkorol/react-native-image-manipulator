import React from "react";
import { AsyncModal } from "./components/AsyncModal";
import { MainProvider } from "./contexts/MainContext";

interface IProps {
  children: React.ReactNode;
}

export { useImageManipulator } from "./hooks/useImageManipulator";

export const ImageManipulatorProvider = ({ children }: IProps) => {
  return (
    <MainProvider>
      <AsyncModal />
      {children}
    </MainProvider>
  );
};
