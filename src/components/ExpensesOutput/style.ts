import { StyleSheet } from "react-native";
import { fontSizeScale, horizontalScale } from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    padding: horizontalScale(20),
    backgroundColor: colors.primary700,
    flex: 1,
  },
  emptyLabel: {
    fontWeight: "bold",
    fontSize: fontSizeScale(16),
    color: "white",
    textAlign: "center",
  },
});

export default styles;
