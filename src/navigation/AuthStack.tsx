import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { colors } from "../constants/colors";
import Login from "../screens/LogIn";
import SignIn from "../screens/SignIn";

export type AuthStackParamList = {
  LogIn: undefined;
  SignIn: undefined;
};

export type LoginProp = NativeStackScreenProps<AuthStackParamList, "LogIn">;

export type SignInProp = NativeStackScreenProps<AuthStackParamList, "SignIn">;

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavOption: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: colors.primary50 },
  headerTintColor: colors.primary700,
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LogIn"
        component={Login}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
