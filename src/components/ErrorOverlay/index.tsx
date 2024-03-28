import { View, Text } from "react-native";
import Button from "../Button";
import { BtnMode } from "../Button/type";
import styles from "./style";

export type ErrorOverlayProps = {
  message: string;
  onConfirm: () => void;
};

const ErrorOverlay = (Props: ErrorOverlayProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured !</Text>
      <Text style={[styles.message, styles.text]}>{Props.message}</Text>
      <Button btnMode={BtnMode.regular} onPress={Props.onConfirm}>
        Okay
      </Button>
    </View>
  );
};

export default ErrorOverlay;
