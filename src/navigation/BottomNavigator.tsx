import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import AllExpenses from "../screens/AllExpenses";
import RecentExpenses from "../screens/RecentExpenses";
import { colors } from "../constants/colors";
import { Icon } from "../types/icon";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { MainStackParamList } from "./MainStack";
import { horizontalScale } from "../util/scaling";
import AllPlaces from "../screens/AllPlaces";

export type BottomNavigatorParamList = {
  AllExpenses: undefined;
  RecentExpenses: undefined;
  AllPlaces: undefined;
};

export type AllExpensesScreenProp = BottomTabNavigationProp<
  BottomNavigatorParamList,
  "AllExpenses"
>;

export type RecentExpensesScreenProp = BottomTabNavigationProp<
  BottomNavigatorParamList,
  "RecentExpenses"
>;

export type AllPlacesScreenProp = NativeStackScreenProps<
  BottomNavigatorParamList,
  "AllPlaces"
>;

const BottomNavOptions = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<MainStackParamList>;
}): BottomTabNavigationOptions => ({
  headerStyle: { backgroundColor: colors.primary50 },
  headerTintColor: colors.primary700,
  tabBarStyle: { backgroundColor: colors.primary50 },
  tabBarActiveTintColor: colors.primary700,
  tabBarInactiveTintColor: colors.primary200,
  headerRight: ({ tintColor }: any) => (
    <IconButton
      icon={{ size: 24, name: "add", color: tintColor }}
      onPress={() => {
        navigation.navigate("ManageExpense", { expenseId: null });
      }}
    />
  ),
  headerLeft: ({ tintColor }: any) => (
    <IconButton
      icon={{ size: horizontalScale(24), name: "log-out", color: tintColor }}
      isLogoutBtn
    />
  ),
});

const RecentTabIcon = ({ color, size }: Icon) => {
  return <Ionicons name={"hourglass"} size={size} color={color} />;
};

const AllTabIcon = ({ color, size }: Icon) => {
  return <Ionicons name="calendar" size={size} color={color} />;
};

const AllPlacesTabIcon = ({ color, size }: Icon) => {
  return <Ionicons name="map" size={size} color={color} />;
};

const BottomTab = createBottomTabNavigator<BottomNavigatorParamList>();

const BottomTabNav = () => {
  return (
    <BottomTab.Navigator screenOptions={BottomNavOptions}>
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: RecentTabIcon,
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: AllTabIcon,
        }}
      />
      <BottomTab.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={({
          navigation,
        }: {
          navigation: NativeStackNavigationProp<MainStackParamList>;
        }) => ({
          title: "My stores",
          tabBarLabel: "Stores",
          tabBarIcon: AllPlacesTabIcon,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon={{ size: 24, name: "add", color: tintColor }}
              onPress={() => {
                navigation.navigate("AddPlace");
              }}
            />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNav;
