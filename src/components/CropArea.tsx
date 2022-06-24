import React, { useContext } from "react";
import { GestureResponderEvent } from "react-native";
import Svg, { Circle, Polygon } from "react-native-svg";
import { ManipulationStage } from "../constants/enums";
import { IMainContext, MainContext } from "../contexts/MainContext";

export const CropArea = (ctx: IMainContext) => {
  /* ******************** Hooks ******************** */
  const { cropPoints, manipulationStage, _setCropPoints, cropViewDims } = ctx;

  /* ******************** Variables ******************** */
  const isVisible = manipulationStage === ManipulationStage.CROP;

  /* ******************** Functions ******************** */
  const handleOnTouch = (pointType: "topLeft" | "topRight" | "bottomRight" | "bottomLeft") => (event: GestureResponderEvent) => {
    const x = event.nativeEvent.locationX;
    const y = event.nativeEvent.locationY;
    const { pageX, pageY } = event.nativeEvent;
    console.log(cropViewDims, pageX);
    if (
      pageX <= cropViewDims.x ||
      pageX >= cropViewDims.x + cropViewDims.width ||
      pageY <= cropViewDims.y ||
      pageY >= cropViewDims.y + cropViewDims.height
    ) {
      return;
    }
    _setCropPoints((prevState) => (prevState ? { ...prevState, [pointType]: { x, y } } : prevState));
  };

  /* ******************** JSX ******************** */
  if (!cropPoints) {
    return <></>;
  }

  return (
    <Svg style={{ display: isVisible ? "flex" : "none" }} height={cropViewDims.height} width={cropViewDims.width}>
      <Polygon
        points={`
        ${cropPoints.topLeft.x},${cropPoints.topLeft.y} 
        ${cropPoints.topRight.x},${cropPoints.topRight.y} 
        ${cropPoints.bottomRight.x},${cropPoints.bottomRight.y} 
        ${cropPoints.bottomLeft.x},${cropPoints.bottomLeft.y}
        `}
        stroke="lightblue"
        fill="lightblue"
        fillOpacity={0.3}
        strokeWidth="2"
      />
      <Circle
        pointerEvents="box-only"
        cx={cropPoints.topLeft.x}
        cy={cropPoints.topLeft.y}
        r="10"
        fill="lightblue"
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderMove={handleOnTouch("topLeft")}
      />
      <Circle
        cx={cropPoints.topRight.x}
        cy={cropPoints.topRight.y}
        r="10"
        fill="lightblue"
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderMove={handleOnTouch("topRight")}
      />
      <Circle
        cx={cropPoints.bottomRight.x}
        cy={cropPoints.bottomRight.y}
        r="10"
        fill="lightblue"
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderMove={handleOnTouch("bottomRight")}
      />
      <Circle
        cx={cropPoints.bottomLeft.x}
        cy={cropPoints.bottomLeft.y}
        r="10"
        fill="lightblue"
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderMove={handleOnTouch("bottomLeft")}
      />
    </Svg>
  );
};
