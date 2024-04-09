import { StyleSheet } from "react-native";
import { fontSizeScale, horizontalScale } from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: horizontalScale(24),
    padding: horizontalScale(6),
    margin: horizontalScale(3),
  },
  btnWithTextContainer: {
    borderWidth: 2,
    borderColor: colors.primary500,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: horizontalScale(6),
  },
  text: {
    paddingLeft: horizontalScale(6),
    fontSize: fontSizeScale(18),
    color: colors.primary500,
  },
  pressedBtn: {
    opacity: 0.6,
  },
});

export default styles;
