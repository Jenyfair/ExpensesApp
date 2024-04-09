import { StyleSheet } from "react-native";
import {
  fontSizeScale,
  horizontalScale,
  verticalScale,
} from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: horizontalScale(4),
    marginVertical: verticalScale(6),
  },
  label: {
    fontSize: fontSizeScale(14),
    color: colors.primary800,
    marginBottom: verticalScale(4),
  },
  input: {
    backgroundColor: colors.lightGray,
    padding: horizontalScale(6),
    borderRadius: horizontalScale(6),
    fontSize: fontSizeScale(18),
    color: colors.primary800,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalid: {
    borderColor: colors.error50,
    borderWidth: horizontalScale(2),
  },
  invalidLabel: {
    color: colors.error500,
  },
});

export default styles;
