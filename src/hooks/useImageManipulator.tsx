import React, { useContext } from "react";
import { IMainContext, MainContext } from "../contexts/MainContext";

export const useImageManipulator = (): IMainContext => {
  const context = useContext(MainContext);
  return context;
};
