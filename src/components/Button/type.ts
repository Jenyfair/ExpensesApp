import { StyleProp, ViewStyle } from "react-native";

export interface IButton {
  onPress: () => void;
  btnMode: BtnMode;
  children: React.ReactNode | React.ReactNode[];
  style?: StyleProp<ViewStyle>;
}

export enum BtnMode {
  flat = "flat",
  regular = "regular",
}
