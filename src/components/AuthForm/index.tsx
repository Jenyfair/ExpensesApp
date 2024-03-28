import { Text, View } from "react-native";
import { ICredentials, validCredential } from "../../types/credentials";
import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { BtnMode } from "../Button/type";

export type AuthFormProps = {
  isLogin: boolean;
  onSubmit: (props: ICredentials) => void;
  credentialsInvalid: validCredential;
};

const AuthForm = (props: AuthFormProps) => {
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] =
    useState<string>("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = props.credentialsInvalid;

  const updateInputValueHandler = (inputType: string, enteredValue: string) => {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  };

  const submitHandler = () => {
    console.log("in auth form submitHandler");

    props.onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
    console.log("props:", enteredEmail, enteredConfirmEmail);
  };
  return (
    <View>
      <Input
        label="Email Address"
        onChangeText={updateInputValueHandler.bind(this, "email")}
        value={enteredEmail}
        keyboardType="email-address"
        invalid={emailIsInvalid}
      />
      {!props.isLogin && (
        <Input
          label="Confirm Email Address"
          onChangeText={updateInputValueHandler.bind(this, "confirmEmail")}
          value={enteredConfirmEmail}
          keyboardType="email-address"
          invalid={emailsDontMatch}
        />
      )}
      <Input
        label="Password"
        onChangeText={updateInputValueHandler.bind(this, "password")}
        secureTextEntry={true}
        value={enteredPassword}
        invalid={passwordIsInvalid}
      />
      {!props.isLogin && (
        <Input
          label="Confirm Password"
          onChangeText={updateInputValueHandler.bind(this, "confirmPassword")}
          secureTextEntry={true}
          value={enteredConfirmPassword}
          invalid={passwordsDontMatch}
        />
      )}
      <View>
        <Button btnMode={BtnMode.regular} onPress={submitHandler}>
          {props.isLogin ? "Log In" : "Sign Up"}
        </Button>
      </View>
    </View>
  );
};

export default AuthForm;
