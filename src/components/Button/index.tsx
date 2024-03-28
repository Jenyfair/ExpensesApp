import { Pressable, Text, View } from "react-native";
import { IButton } from "./type";
import styles from "./style";

const Button = ({ onPress, btnMode, children, style }: IButton) => {
  const flatMode = btnMode === "flat";
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <View style={[styles.container, flatMode && styles.flat]}>
          <Text style={[styles.btnText, flatMode && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;
