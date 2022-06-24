import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  icon?: React.ReactNode;
  isLoading: boolean;
}

export const Button: React.FC<Props> = ({ children, icon, isLoading, ...rest }) => {
  return (
    <TouchableOpacity disabled={isLoading} {...rest} style={[styles.container, rest.style]}>
      {/* {icon} */}
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textTransform: "uppercase",
  },
  icon: {
    marginRight: 5,
    color: "white",
    fontSize: 20,
  },
});
