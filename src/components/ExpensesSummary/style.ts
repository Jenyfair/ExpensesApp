import { StyleSheet } from "react-native";
import {
  fontSizeScale,
  horizontalScale,
  verticalScale,
} from "../../util/scaling";
import { colors } from "../../constants/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
  container: {
    padding: horizontalScale(10),
    marginBottom: verticalScale(10),
    backgroundColor: colors.primary50,
    borderRadius: horizontalScale(6),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: fontSizeScale(16),
    color: colors.primary400,
  },
  sum: {
    fontSize: fontSizeScale(16),
    fontWeight: "bold",
    color: Colors.primary500,
  },
});

export default styles;
