import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(14),
    paddingVertical: verticalScale(8),
    borderRadius: horizontalScale(6),
    backgroundColor: colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: colors.primary200,
  },
  pressed: {
    opacity: 0.65,
    backgroundColor: colors.primary100,
    borderRadius: horizontalScale(4),
  },
});

export default styles;
