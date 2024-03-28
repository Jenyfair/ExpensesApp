import { View } from "react-native";
import styles from "./style";
import { ManageExpenseProp } from "../../navigation/MainStack";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../../components/IconButton";
import { colors } from "../../constants/colors";
import { ExpensesContext } from "../../store/expensesCtx";
import ExpenseForm from "../../components/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../../util/api";
import Loader from "../../components/Loader";
import ErrorOverlay from "../../components/ErrorOverlay";
import { AuthContext } from "../../store/authCtx";
import useAxiosInterceptor from "../../hooks/useAxiosInterceptor";

const ManageExpense = ({ navigation, route }: ManageExpenseProp) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { axBe } = useAxiosInterceptor();

  const expensesCtx = useContext(ExpensesContext);
  const authCtx = useContext(AuthContext);
  const userToken = authCtx.state.token;

  if (userToken === null) {
    throw new Error("Can not edit if not connected");
  }

  const selectedExpense = expensesCtx.state.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  console.log("editedExpenseId", editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    if (!editedExpenseId) {
      throw new Error("can not delete without ID");
    }
    setIsLoading(true);
    console.log("deleting");
    try {
      await deleteExpense(axBe, editedExpenseId, userToken);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      setError("Impossible to delete");
    }
  };
  const cancelHandler = () => {
    console.log("cancel");
    navigation.goBack();
  };
  const updateHandler = async (expenseData: any) => {
    setIsLoading(true);
    console.log("updateHandler");
    if (!editedExpenseId) {
      throw new Error("Can not update without ExpenseId");
    }
    try {
      await updateExpense(axBe, editedExpenseId, expenseData, userToken);
      expensesCtx.updateExpense({
        id: editedExpenseId,
        name: expenseData.name,
        amount: expenseData.amount,
        date: expenseData.date,
      });
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      setError("Impossible to update");
    }
  };
  const addHandler = async (expenseData: any) => {
    setIsLoading(true);
    try {
      const id = await storeExpense(axBe, expenseData, userToken);
      console.log("addHandler", "id from Fiebase:", id);
      expensesCtx.addExpense({ ...expenseData, id: id });
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      setError("Impossible to add");
    }
  };
  const errorConfirmHandler = () => {
    setError(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorConfirmHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={isEditing ? updateHandler : addHandler}
        onCancel={cancelHandler}
        submitBtnLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={{ name: "trash", size: 24, color: colors.error500 }}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;
