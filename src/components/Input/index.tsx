import { Text, TextInput, View } from "react-native";
import { CustomTextInputProps } from "../../types/textInput";
import styles from "./style";

const Input = ({
  label,
  customStyle,
  invalid,
  onChangeText,
  ...textInputConfig
}: CustomTextInputProps) => {
  const inputStyles: any[] = [styles.input, invalid && styles.invalid];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.multiline);
  }

  return (
    <View style={[styles.inputContainer, customStyle]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={inputStyles}
        {...textInputConfig}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Input;
