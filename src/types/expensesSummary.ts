import { IExpense } from "./expense";

export interface IExpensesSummary {
  expenses: IExpense[] | undefined;
  period: string;
}
