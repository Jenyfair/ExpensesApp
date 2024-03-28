import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    padding: horizontalScale(6),
    flex: 1,
  },
  deleteContainer: {
    padding: horizontalScale(4),
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: horizontalScale(25),
    backgroundColor: colors.error50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default styles;
