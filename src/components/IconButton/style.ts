import { StyleSheet } from "react-native";
import { horizontalScale } from "../../util/scaling";

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: horizontalScale(24),
    padding: horizontalScale(6),
    margin: horizontalScale(3),
  },
  pressedBtn: {
    opacity: 0.6,
  },
});

export default styles;
