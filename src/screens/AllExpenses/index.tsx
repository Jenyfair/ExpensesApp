import ExpensesOutput from "../../components/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../../store/expensesCtx";
const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const expenses = expensesCtx.state.expenses;
  return (
    <ExpensesOutput
      fallbackText="No expense registered yet"
      summary={{ period: "All", expenses: expenses }}
    />
  );
};

export default AllExpenses;
