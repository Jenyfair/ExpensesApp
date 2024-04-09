import { createContext, useReducer } from "react";
import { IExpense } from "../types/expense";
import { ExpensesActions, Types, expenseReducer } from "./expensesReducer";

type InitialStateType = {
  expenses: IExpense[];
};

const initialState = {
  expenses: [],
};

export const ExpensesContext = createContext<{
  state: InitialStateType;
  addExpense: (expenseData: IExpense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expenseData: IExpense) => void;
  setExpenses: (expenses: IExpense[]) => void;
}>({
  state: initialState,
  addExpense: ({}) => null,
  deleteExpense: () => null,
  updateExpense: ({}) => null,
  setExpenses: ([]) => null,
});

const expensesReducer = (
  { expenses }: InitialStateType,
  action: ExpensesActions
) => ({
  expenses: expenseReducer(expenses, action),
});

type ExpensesContextProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const ExpensesContextProvider = ({
  children,
}: ExpensesContextProviderProps) => {
  const [state, dispatch] = useReducer(expensesReducer, initialState);
  const addExpense = (expenseData: IExpense) => {
    dispatch({ type: Types.Add, payload: expenseData });
  };
  const setExpenses = (expenses: IExpense[]) => {
    dispatch({ type: Types.Set, payload: expenses });
  };
  const deleteExpense = (id: string) => {
    dispatch({ type: Types.Delete, payload: { id: id } });
  };
  const updateExpense = (expenseData: IExpense) => {
    dispatch({ type: Types.Update, payload: expenseData });
  };

  const value = {
    state,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};
