import { Pressable, Text, View } from "react-native";
import { Icon } from "../../types/icon";
import { IIconButton } from "./type";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";
import { useContext } from "react";
import { AuthContext } from "../../store/authCtx";

const IconButton = ({
  icon,
  onPress,
  isLogoutBtn,
  text,
  textStyle,
}: IIconButton) => {
  const authCtx = useContext(AuthContext);
  const logout = () => {
    authCtx.logout();
  };
  return (
    <Pressable
      onPress={isLogoutBtn ? logout : onPress}
      style={({ pressed }) => pressed && styles.pressedBtn}
    >
      <View
        style={[styles.btnContainer, text ? styles.btnWithTextContainer : null]}
      >
        <Ionicons size={icon.size} color={icon.color} name={icon.name} />
        {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
      </View>
    </Pressable>
  );
};

export default IconButton;
