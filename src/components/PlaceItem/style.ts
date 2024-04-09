import { StyleSheet } from "react-native";
import {
  fontSizeScale,
  horizontalScale,
  verticalScale,
} from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: horizontalScale(6),
    marginVertical: verticalScale(6),
    marginHorizontal: horizontalScale(12),
    backgroundColor: colors.lightGray,
    shadowColor: colors.gray700,
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.6,
  },
  img: {
    flex: 1,
    borderBottomLeftRadius: horizontalScale(6),
    borderTopLeftRadius: horizontalScale(6),
    height: 100,
  },
  info: {
    flex: 2,
    padding: horizontalScale(8),
  },
  title: {
    color: colors.primary500,
    fontSize: fontSizeScale(18),
    fontWeight: "bold",
  },
  address: {
    fontSize: fontSizeScale(14),
    color: colors.primary500,
  },
});

export default styles;
