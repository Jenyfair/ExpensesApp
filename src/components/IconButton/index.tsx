import { Pressable, View } from "react-native";
import { Icon } from "../../types/icon";
import { IIconButton } from "./type";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";
import { useContext } from "react";
import { AuthContext } from "../../store/authCtx";

const IconButton = ({ icon, onPress, isLogoutBtn }: IIconButton) => {
  const authCtx = useContext(AuthContext);
  const logout = () => {
    authCtx.logout();
  };
  return (
    <Pressable
      onPress={isLogoutBtn ? logout : onPress}
      style={({ pressed }) => pressed && styles.pressedBtn}
    >
      <View style={styles.btnContainer}>
        <Ionicons size={icon.size} color={icon.color} name={icon.name} />
      </View>
    </Pressable>
  );
};

export default IconButton;
