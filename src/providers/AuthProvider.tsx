import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/authCtx";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "../navigation/MainStack";
import AuthStack from "../navigation/AuthStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

const AuthProvider = () => {
  const authCtx = useContext(AuthContext);
  const isAuthenticated = authCtx.state.isAuthenticated;

  const Navigation = () => {
    console.log("is authenticated:", authCtx.state.isAuthenticated);
    //console.log("refreshToken", authCtx.state.refreshToken);
    //console.log("expirationDate", authCtx.state.tokenExpirationDate);

    //console.log("ctx token", authCtx.state.token);
    return (
      <NavigationContainer>
        {isAuthenticated ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    );
  };
  const [isLogginIn, setIsLogginIn] = useState<boolean>(true);
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
      const storeTokenExpirationDate = await AsyncStorage.getItem(
        "tokenExpirationDate"
      );
      console.log(
        "IN ROOT COMPONENT",
        "storedRefreshToken",
        storedRefreshToken,
        "storeTokenExpirationDate",
        storeTokenExpirationDate
      );

      if (storedToken && storedRefreshToken && storeTokenExpirationDate) {
        authCtx.authenticate(
          storedToken,
          storedRefreshToken,
          Number(storeTokenExpirationDate)
        );
      }
      setIsLogginIn(false);
    };
    fetchToken();
  }, [isAuthenticated]);

  if (isLogginIn) {
    return <AppLoading />;
  }
  return <Navigation />;
};

export default AuthProvider;
