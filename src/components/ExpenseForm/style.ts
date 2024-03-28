import { StyleSheet } from "react-native";
import {
  fontSizeScale,
  horizontalScale,
  verticalScale,
} from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  formContainer: {
    padding: horizontalScale(4),
    marginTop: verticalScale(12),
  },
  title: {
    fontWeight: "bold",
    fontSize: fontSizeScale(18),
    marginVertical: verticalScale(14),
    color: colors.primary400,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  formValidationMsg: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.error500,
    fontSize: fontSizeScale(16),
    marginVertical: verticalScale(5),
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: horizontalScale(10),
    borderBottomColor: colors.primary50,
    borderBottomWidth: horizontalScale(2),
  },
  btn: {
    marginHorizontal: horizontalScale(6),
    marginBottom: verticalScale(14),
    minWidth: horizontalScale(120),
  },
});

export default styles;
