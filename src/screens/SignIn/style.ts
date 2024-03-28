import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    padding: horizontalScale(6),
    flex: 1,
  },
});

export default styles;
