import { Text, View } from "react-native";
import Input from "../Input";
import { useEffect, useState } from "react";
import styles from "./style";
import globalStyle from "../../../assets/styles/globalStyles";
import Button from "../Button";
import { BtnMode } from "../Button/type";
import { IExpense } from "../../types/expense";
import { getFormattedDate } from "../../util/date";

export type ExpensesFormProps = {
  onCancel: () => void;
  onSubmit: ({}) => void;
  submitBtnLabel: string;
  defaultValues?: IExpense;
};

const ExpenseForm = (props: ExpensesFormProps) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: props.defaultValues ? props.defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: props.defaultValues
        ? getFormattedDate(props.defaultValues.date)
        : "",
      isValid: true,
    },
    name: {
      value: props.defaultValues ? props.defaultValues.name : "",
      isValid: true,
    },
  });

  const handleInputChanged = (inputId: string, enteredValue: string) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputId]: { value: enteredValue, isValid: true },
      };
    });
  };

  const handleSubmit = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      name: inputs.name.value,
    };

    const isValidAmount = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isValidDate = !isNaN(expenseData.date.getTime());
    const isValidName = expenseData.name.trim().length > 0;

    console.log(
      "on HandleSubmit",
      "isValidAmount",
      isValidAmount,
      "isValidDate",
      isValidDate,
      "isValidName",
      isValidName
    );

    if (!isValidAmount || !isValidDate || !isValidName) {
      setInputs({
        amount: {
          value: inputs.amount.value,
          isValid: isValidAmount,
        },
        date: {
          value: inputs.date.value,
          isValid: isValidDate,
        },
        name: {
          value: inputs.name.value,
          isValid: isValidName,
        },
      });
      return;
    }

    props.onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid || !inputs.date.isValid || !inputs.name.isValid;

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.inputsRow}>
        <Input
          customStyle={globalStyle.flex}
          invalid={!inputs.amount.isValid}
          label="Amount"
          keyboardType="number-pad"
          onChangeText={(enteredAmount) =>
            handleInputChanged("amount", enteredAmount)
          }
          value={inputs.amount.value}
        />
        <Input
          customStyle={globalStyle.flex}
          label="Date"
          invalid={!inputs.date.isValid}
          keyboardType="default"
          placeholder="YYYY-MM-DD"
          onChangeText={(entereDate) => handleInputChanged("date", entereDate)}
          value={inputs.date.value}
          maxLength={10}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.name.isValid}
        keyboardType="default"
        onChangeText={(enteredName) => handleInputChanged("name", enteredName)}
        value={inputs.name.value}
        multiline={true}
      />
      {formIsInvalid && (
        <Text style={styles.formValidationMsg}>
          Your expense is invalid ! Please check your form.
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button
          btnMode={BtnMode.flat}
          onPress={props.onCancel}
          style={styles.btn}
        >
          Cancel
        </Button>
        <Button
          style={styles.btn}
          btnMode={BtnMode.regular}
          onPress={handleSubmit}
        >
          {props.submitBtnLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;
