import ExpensesSummary from "../ExpensesSummary";
import ExpensesList from "../ExpensesList";
import { IExpensesSummary } from "../../types/expensesSummary";
import { Text, View } from "react-native";
import styles from "./style";

export type ExpensesOutputProps = {
  fallbackText: string;
  summary: IExpensesSummary;
};

const ExpensesOutput = (props: ExpensesOutputProps) => {
  let content = <Text style={styles.emptyLabel}>{props.fallbackText}</Text>;
  if (props.summary.expenses && props.summary.expenses.length > 0) {
    content = <ExpensesList expenses={props.summary.expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={props.summary.expenses}
        period={props.summary.period}
      />
      {content}
    </View>
  );
};

export default ExpensesOutput;
