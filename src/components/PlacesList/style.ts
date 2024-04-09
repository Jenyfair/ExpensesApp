import { StyleSheet } from "react-native";
import { fontSizeScale, verticalScale } from "../../util/scaling";

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    fontSize: fontSizeScale(16),
  },
  listContainer: {
    marginTop: verticalScale(6),
  },
});

export default styles;
