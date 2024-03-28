import { StyleSheet } from "react-native";
import {
  fontSizeScale,
  horizontalScale,
  verticalScale,
} from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    padding: horizontalScale(16),
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: colors.primary800,
    fontSize: fontSizeScale(36),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: verticalScale(12),
  },
  buttons: {
    marginTop: verticalScale(8),
  },
});

export default styles;
