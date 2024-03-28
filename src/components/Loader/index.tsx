import { ActivityIndicator, Text, View } from "react-native";
import styles from "./style";

export type LoaderProps = {
  message?: string;
};

const Loader = (props: LoaderProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"white"} />
      {props.message ? (
        <View>
          <Text>{props.message}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Loader;
