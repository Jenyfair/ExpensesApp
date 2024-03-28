import { FlatList } from "react-native";
import { IExpense } from "../../types/expense";
import ExpenseItem from "../ExpenseItem";

type ExpensesListProps = { expenses: IExpense[] | undefined };
const ExpensesList = (props: ExpensesListProps) => {
  const renderExpenseItem = (expense: IExpense) => {
    return (
      <ExpenseItem
        name={expense.name}
        date={expense.date}
        amount={expense.amount}
        id={expense.id}
      />
    );
  };

  return (
    <FlatList
      data={props.expenses}
      renderItem={(expense) => renderExpenseItem(expense.item)}
      keyExtractor={(expense) => expense.id}
    />
  );
};

export default ExpensesList;
