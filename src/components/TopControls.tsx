import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { ManipulationStage } from "../constants/enums";
import { IMainContext, MainContext } from "../../src/contexts/MainContext";
import { Button } from "./common";
import { ArrowLeftIcon, CheckIcon } from "../assets/icons";

export const TopControls = (ctx: IMainContext) => {
  /* ******************** Hooks ******************** */
  const { _handleDoneCommand, manipulationStage, _setManipulationStage, _clearState, isLoading, _handleClose } = ctx;

  /* ******************** Functions ******************** */

  const handleOnPressBack = () => {
    _setManipulationStage(ManipulationStage.VIEW);
  };

  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      {manipulationStage !== ManipulationStage.VIEW && (
        <Button isLoading={isLoading} icon={<ArrowLeftIcon />} onPress={handleOnPressBack}>
          Back
        </Button>
      )}

      {manipulationStage === ManipulationStage.VIEW && (
        <Button isLoading={isLoading} icon={<ArrowLeftIcon />} onPress={_handleClose}>
          Close
        </Button>
      )}

      {manipulationStage === ManipulationStage.VIEW && (
        <Button onPress={_handleDoneCommand} isLoading={isLoading} icon={<CheckIcon />}>
          Done
        </Button>
      )}

      {/* {manipulationStage !== ManipulationStage.VIEW && (
        <Button onPress={_handleDoneCommand} icon="check">
          Apply
        </Button>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#302e3b",
  },
});
