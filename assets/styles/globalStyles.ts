import { StyleSheet } from "react-native";
import { verticalScale } from "../../src/util/scaling";

const globalStyle = StyleSheet.create({
  whiteBackground: {
    backgroundColor: "white",
  },
  flex: {
    flex: 1,
  },
  mb24: {
    marginBottom: verticalScale(24),
  },
  centered: {
    alignItems: "center",
  },
});

export default globalStyle;
