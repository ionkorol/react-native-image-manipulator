import React from "react";
import { TouchableOpacityProps } from "react-native";
interface Props extends TouchableOpacityProps {
    icon?: React.ReactNode;
    isLoading: boolean;
    testID: string;
}
export declare const Button: React.FC<Props>;
export {};
