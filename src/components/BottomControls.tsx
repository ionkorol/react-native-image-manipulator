import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ManipulationStage } from "../constants/enums";
import { FILTER, IMainContext } from "../../src/contexts/MainContext";
import { Button } from "./common";
import { CropIcon, DropletIcon, FillIcon } from "../assets/icons";

export const BottomControls = (ctx: IMainContext) => {
  /* ******************** Hooks ******************** */
  const {
    _handleGrayScale,
    _handlePerspectiveCrop,
    manipulationStage,
    _setManipulationStage,
    _handleBlackWhite,
    isLoading,
    appliedFilter,
    _handleNoFilter,
  } = ctx;
  /* ******************** Variables ******************** */
  const containerJustifyContent = useMemo((): "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" => {
    if (manipulationStage === ManipulationStage.CROP) {
      return "center";
    }
    return "space-around";
  }, []);

  /* ******************** Functions ******************** */
  const handleFiltersPress = () => {
    _setManipulationStage(ManipulationStage.FILTER);
  };

  const handleCropPress = () => {
    _setManipulationStage(ManipulationStage.CROP);
  };

  /* ******************** JSX ******************** */
  return (
    <View style={[styles.container, { justifyContent: containerJustifyContent }]}>
      {manipulationStage === ManipulationStage.VIEW && (
        <>
          <Button onPress={handleCropPress} icon={<CropIcon />} isLoading={isLoading}>
            Crop
          </Button>
          <Button onPress={handleFiltersPress} icon={<FillIcon />} isLoading={isLoading}>
            Filters
          </Button>
        </>
      )}

      {manipulationStage === ManipulationStage.CROP && (
        <Button onPress={_handlePerspectiveCrop} icon={<CropIcon />} isLoading={isLoading}>
          Crop
        </Button>
      )}

      {manipulationStage === ManipulationStage.FILTER && (
        <View style={styles.buttonGroup}>
          <Button
            style={[styles.button, appliedFilter !== FILTER.NONE && styles.buttonInactive]}
            icon={<DropletIcon />}
            isLoading={isLoading}
            onPress={_handleNoFilter}
          >
            None
          </Button>
          <Button
            style={[styles.button, appliedFilter !== FILTER.GRAY && styles.buttonInactive]}
            icon={<DropletIcon />}
            isLoading={isLoading}
            onPress={_handleGrayScale}
          >
            Gray
          </Button>
          <Button
            style={[styles.button, appliedFilter !== FILTER.BW && styles.buttonInactive]}
            icon={<DropletIcon />}
            isLoading={isLoading}
            onPress={_handleBlackWhite}
          >
            B/W
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#302e3b",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonGroup: {
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    flex: 1,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    margin: 0,
  },
  buttonInactive: {
    backgroundColor: "gray",
  },
});
