import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../util/scaling";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(6),
    paddingVertical: verticalScale(10),
  },
  imagePreview: {
    width: "100%",
    height: horizontalScale(200),
    backgroundColor: colors.lightGray,
    marginVertical: verticalScale(12),
    borderRadius: horizontalScale(6),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: horizontalScale(6),
  },
  fallbackImgText: {
    color: colors.primary400,
    fontWeight: "700",
    textAlign: "center",
  },
  btnContainer: {
    marginTop: verticalScale(12),
  },
});

export default styles;
