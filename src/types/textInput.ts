import { TextInputProps } from "react-native";

export type CustomTextInputProps = TextInputProps & {
  customStyle?: any;
  label: string;
  invalid: boolean;
};
