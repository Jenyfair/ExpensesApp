import { StyleSheet } from "react-native";
import { horizontalScale } from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: horizontalScale(10),
    backgroundColor: colors.primary100,
  },
});

export default styles;
