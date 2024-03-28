import { Text, View } from "react-native";
import { IExpensesSummary } from "../../types/expensesSummary";
import styles from "./style";

const ExpensesSummary = ({ expenses, period }: IExpensesSummary) => {
  const totalExpenses = expenses?.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{period}</Text>
      {totalExpenses ? (
        <Text style={styles.sum}>{totalExpenses.toFixed(2)} $</Text>
      ) : null}
    </View>
  );
};

export default ExpensesSummary;
