import { StyleSheet } from "react-native";
import {
  fontSizeScale,
  horizontalScale,
  verticalScale,
} from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  pressedBtn: {
    opacity: 0.6,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: horizontalScale(6),
    marginVertical: verticalScale(4),
    backgroundColor: colors.primary500,
    borderRadius: 4,
    elevation: 3,
    shadowRadius: 4,
    shadowColor: colors.gray500,
    shadowOffset: { width: 1, height: 1 },
  },
  expenseContainer: {
    paddingVertical: verticalScale(6),
  },
  textBase: {
    color: colors.primary50,
  },
  name: {
    fontSize: fontSizeScale(16),
    fontWeight: "bold",
  },
  valueContainer: {
    flexDirection: "row",
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(3),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    minWidth: horizontalScale(65),
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  value: {
    color: colors.primary500,
    fontWeight: "bold",
  },
});

export default styles;
