import { Pressable, Text, View } from "react-native";
import { IExpense } from "../../types/expense";
import styles from "./style";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainStack";

const ExpenseItem = ({ id, name, amount: value, date }: IExpense) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const ExpensePressHandler = () => {
    navigation.navigate("ManageExpense", { expenseId: id });
    console.log("pressed btn");
  };

  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressedBtn, styles.container]}
      onPress={ExpensePressHandler}
    >
      <View style={styles.expenseContainer}>
        <Text style={[styles.textBase, styles.name]}>{name}</Text>
        <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;
