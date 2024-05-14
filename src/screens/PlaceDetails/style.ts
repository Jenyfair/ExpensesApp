import { StyleSheet } from "react-native";
import { fontSizeScale, horizontalScale } from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    minHeight: 300,
    width: "100%",
    height: "40%",
  },
  addressContainer: {
    alignContent: "center",
    justifyContent: "center",
    padding: horizontalScale(12),
  },
  address: {
    fontSize: fontSizeScale(14),
    color: colors.primary700,
  },
});

export default styles;
