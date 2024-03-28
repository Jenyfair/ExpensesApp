import { StyleSheet } from "react-native";
import {
  fontSizeScale,
  horizontalScale,
  verticalScale,
} from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: horizontalScale(10),
    backgroundColor: colors.primary100,
  },
  text: {
    color: "white",
    textAlign: "center",
    paddingVertical: verticalScale(4),
  },
  title: {
    fontSize: fontSizeScale(20),
    fontWeight: "bold",
  },
  message: {
    fontSize: fontSizeScale(16),
    paddingBottom: verticalScale(26),
  },
});

export default styles;
