import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import ManageExpense from "../screens/ManageExpense";
import BottomTabNav from "./BottomNavigator";
import { colors } from "../constants/colors";
import AddPlace from "../screens/AddPlace";
import Map from "../screens/Map";
import { Location } from "../types/location";

export type MainStackParamList = {
  ManageExpense: { expenseId: string | null };
  AddPlace: { location: Location | null };
  BottomNav: undefined;
  Map: { location: Location | null };
};

export type ManageExpenseProp = NativeStackScreenProps<
  MainStackParamList,
  "ManageExpense"
>;

export type AddPlaceProp = NativeStackScreenProps<
  MainStackParamList,
  "AddPlace"
>;

export type MapProp = NativeStackScreenProps<MainStackParamList, "Map">;

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
        options={{ headerTitle: "Add a new store" }}
        initialParams={{ location: null }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ presentation: "modal", headerTitle: "Choose your location" }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
