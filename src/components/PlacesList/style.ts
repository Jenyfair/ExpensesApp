import { StyleSheet } from "react-native";
import { fontSizeScale } from "../../util/scaling";

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    fontSize: fontSizeScale(16),
  },
});

export default styles;
