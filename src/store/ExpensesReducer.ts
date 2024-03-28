import { IExpense } from "../types/expense";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Delete = "DELETE",
  Add = "ADD",
  Update = "UPDATE",
  Set = "SET",
}

type ExpensePayload = {
  [Types.Add]: IExpense;
  [Types.Update]: IExpense;
  [Types.Delete]: {
    id: string;
  };
  [Types.Set]: IExpense[];
};

export type ExpensesActions =
  ActionMap<ExpensePayload>[keyof ActionMap<ExpensePayload>];

export const expenseReducer = (state: IExpense[], action: ExpensesActions) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const invertedData = action.payload.reverse();
      return invertedData;
    case "DELETE":
      return [...state.filter((expense) => expense.id !== action.payload.id)];
    case "UPDATE":
      const updatableItemIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableItem = state[updatableItemIndex];
      const updatedItem = { ...updatableItem, ...action.payload };
      const updatedExpenses = [...state];
      updatedExpenses[updatableItemIndex] = updatedItem;
      return updatedExpenses;
    default:
      return state;
  }
};
