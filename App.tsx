import { ExpensesContextProvider } from "./src/store/expensesCtx";
import AuthStack from "./src/navigation/AuthStack";
import { AuthContext, AuthContextProvider } from "./src/store/authCtx";
import { useContext, useEffect, useState } from "react";
import MainStack from "./src/navigation/MainStack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { Text, View } from "react-native";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const [isLogginIn, setIsLogginIn] = useState<boolean>(false);
  const isAuthenticated = authCtx.state.isAuthenticated;
  console.log("is authenticated:", authCtx.state.isAuthenticated);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
      const storeTokenExpirationDate = await AsyncStorage.getItem(
        "tokenExpirationDate"
      );
      console.log(
        "IN Navigation COMPONENT",
        "storedRefreshToken",
        storedRefreshToken,
        "storeTokenExpirationDate",
        storeTokenExpirationDate
      );

      if (storedToken && storedRefreshToken && storeTokenExpirationDate) {
        console.log("authenticate");
        authCtx.authenticate(
          storedToken,
          storedRefreshToken,
          Number(storeTokenExpirationDate)
        );
      }
    };

    fetchToken().then(() => {
      setIsLogginIn(false);
    });
  }, []);

  console.log("isLogginIn", isLogginIn);
  console.log("isAuthenticated", isAuthenticated);

  if (isLogginIn) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <ExpensesContextProvider>
          <MainStack />
        </ExpensesContextProvider>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}
