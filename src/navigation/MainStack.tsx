import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import ManageExpense from "../screens/ManageExpense";
import BottomTabNav from "./BottomNavigator";
import { colors } from "../constants/colors";
import AddPlace from "../screens/AddPlace";

export type MainStackParamList = {
  ManageExpense: { expenseId: string | null };
  AddPlace: undefined;
  BottomNav: undefined;
};

export type ManageExpenseProp = NativeStackScreenProps<
  MainStackParamList,
  "ManageExpense"
>;

export type AddPlaceProp = NativeStackScreenProps<
  MainStackParamList,
  "AddPlace"
>;

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavOption: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: colors.primary50 },
  headerTintColor: colors.primary700,
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={MainStackNavOption}>
      <Stack.Screen
        name="BottomNav"
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlace}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
