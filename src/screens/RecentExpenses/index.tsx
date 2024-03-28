import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../../components/ExpensesOutput";
import { ExpensesContext } from "../../store/expensesCtx";
import { getDateMinusDays } from "../../util/date";
import { fetchExpenses } from "../../util/api";
import Loader from "../../components/Loader";
import ErrorOverlay from "../../components/ErrorOverlay";
import { AuthContext } from "../../store/authCtx";
import Button from "../../components/Button";
import { BtnMode } from "../../components/Button/type";
import useAxiosInterceptor from "../../hooks/useAxiosInterceptor";
import { Text, View } from "react-native";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const authCtx = useContext(AuthContext);
  const userToken = authCtx.state.token;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { axBe } = useAxiosInterceptor();

  if (!authCtx.state.isAuthenticated) {
    //throw new Error("Can not fetch if not connected");
    return (
      <View>
        <Text>Not connected stack working</Text>
      </View>
    );
  }

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses(axBe, userToken!);
        expensesCtx.setExpenses(expenses);
      } catch (error: any) {
        setError("Could not fetch expenses");
        console.log("FETCHED ERROR", JSON.stringify(error));
      }
      //console.log("expenses fetched", expenses);
      setIsLoading(false);
    };
    getExpenses();
  }, []);

  //console.log("Expenses setted", expensesCtx.state.expenses);

  const recentExpenses = expensesCtx.state.expenses.filter((expense) => {
    const today = new Date();
    const dateMinus7 = getDateMinusDays(today, 7);
    return expense.date >= dateMinus7;
  });

  const confirmErrorHandler = () => {
    setError(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={confirmErrorHandler} />;
  }

  return (
    <>
      <Button btnMode={BtnMode.flat} onPress={authCtx.resetExpDate}>
        Reset expiration token
      </Button>
      <ExpensesOutput
        summary={{ expenses: recentExpenses, period: "Last 7 days" }}
        fallbackText="No expense registered on the last 7 days"
      />
    </>
  );
};

export default RecentExpenses;
