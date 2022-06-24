import React, { useContext, useRef } from "react";
import { ImageBackground, View } from "react-native";
import { EDITOR_VIEW_GAP } from "../constants/dimensions";
import { IMainContext, MainContext } from "../../src/contexts/MainContext";
import { CropArea } from "./CropArea";
import { LoadingComponent } from "./LoadingComponent";
import { BASE64_PREFIX } from "../constants/files";

export const EditorView = (ctx: IMainContext) => {
  /* ******************** Hooks ******************** */
  const { modifiedImage, _setCropViewDims } = ctx;
  const imgRef = useRef<View>(null);

  /* ******************** JSX ******************** */
  return (
    <View
      ref={imgRef}
      style={{ flex: 1, margin: EDITOR_VIEW_GAP, borderWidth: 1 }}
      onLayout={(e) => {
        if (imgRef.current) {
          imgRef.current.measure((x, y, width, height, pageX, pageY) => _setCropViewDims && _setCropViewDims({ x, y, width, height }));
        }
      }}
    >
      <ImageBackground source={{ uri: `${BASE64_PREFIX}${modifiedImage?.base64}` }} style={{ flex: 1 }} resizeMode="stretch">
        <CropArea {...ctx} />
      </ImageBackground>
    </View>
  );
};
