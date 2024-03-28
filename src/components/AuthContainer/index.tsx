import { Alert, Text, View } from "react-native";
import { ICredentials, validCredential } from "../../types/credentials";
import { useState } from "react";
import AuthForm from "../AuthForm";
import Button from "../Button";
import { BtnMode } from "../Button/type";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStack";

export type AuthContainerProps = {
  isLogin: boolean;
  onAuthenticate: (email: string, password: string) => void;
};

const AuthContainer = (props: AuthContainerProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [credentialsInvalid, setCredentialsInvalid] = useState<validCredential>(
    {
      email: false,
      password: false,
      confirmEmail: false,
      confirmPassword: false,
    }
  );

  const submitHandler = (credentials: ICredentials) => {
    console.log("on submitHandler AuthContainer");
    let { email, confirmEmail, password, confirmPassword } = credentials;
    console.log("credentials", credentials);

    email = email.trim();
    password = password.trim();
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!props.isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    props.onAuthenticate(email, password);
    console.log("email, password:", email, password);
  };

  const switchAuthModeHandler = () => {
    if (props.isLogin) {
      navigation.navigate("SignIn");
    } else {
      navigation.navigate("LogIn");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <AuthForm
        isLogin={props.isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <Button btnMode={BtnMode.flat} onPress={switchAuthModeHandler}>
          {props.isLogin ? "Create a new user" : "Log in instead"}
        </Button>
      </View>
    </View>
  );
};

export default AuthContainer;
