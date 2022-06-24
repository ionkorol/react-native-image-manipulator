import React, { useContext } from "react";
import { Image, Modal, SafeAreaView } from "react-native";
import { EditorView } from "./EditorView";
import { MainContext } from "../contexts/MainContext";
import { TopControls } from "./TopControls";
import { BottomControls } from "./BottomControls";
import { LoadingComponent } from "./LoadingComponent";

export const AsyncModal = () => {
  /* ******************** Hooks ******************** */
  const ctx = useContext(MainContext);
  const { modifiedImage, isLoading } = ctx;
  /* ******************** Variables ******************** */
  const isOpen = Boolean(modifiedImage);

  /* ******************** JSX ******************** */
  if (!isOpen) {
    return <></>;
  }

  return (
    <Modal visible={isOpen} style={{ backgroundColor: "gray" }}>
      <LoadingComponent isLoading={isLoading} />

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <TopControls {...ctx} />
        <EditorView {...ctx} />
        <BottomControls {...ctx} />
      </SafeAreaView>
    </Modal>
  );
};
