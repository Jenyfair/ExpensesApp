import { createContext, useState } from "react";

type InitialStateType = {
  token: string | null;
  refreshToken: string | null;
  tokenExpirationDate: number | null;
  isAuthenticated: boolean;
};

const initialState = {
  token: null,
  refreshToken: null,
  tokenExpirationDate: null,
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
  checkIsTokenExpired: () => {},
  resetExpDate: () => {},
};

export const AuthContext = createContext<{
  state: InitialStateType;
  authenticate: (
    token: string,
    refreshToken: string,
    tokenExpirationDate: number
  ) => void;
  logout: () => void;
  checkIsTokenExpired: (tokenExpirationDate: number) => {};
  resetExpDate: () => void;
}>({
  state: initialState,
  authenticate: () => {},
  logout: () => {},
  checkIsTokenExpired: () => false,
  resetExpDate: () => {},
});

type AuthContextProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [tokenExpirationTimeStamp, setTokenExpirationTimeStamp] = useState<
    number | null
  >(null);
  const authenticate = (
    token: string,
    refreshToken: string,
    tokenExpirationDate: number
  ) => {
    console.log(
      "IN AUTHENTICATE FCT CTX tokenExpirationDate:",
      tokenExpirationDate
    );
    setTokenExpirationTimeStamp(tokenExpirationDate);
    setAuthToken(token);
    setRefreshToken(refreshToken);
  };
  const logout = () => {
    setAuthToken(null);
    setRefreshToken(null);
  };

  const checkIsTokenExpired = (tokenExpirationDate: number) => {
    return tokenExpirationDate <= new Date().getTime();
  };

  const resetExpDate = () => {
    console.log("reset Exp date to 0");

    setTokenExpirationTimeStamp(0);
  };

  const value = {
    state: {
      token: authToken,
      refreshToken: refreshToken,
      isAuthenticated: !!authToken && !!refreshToken,
      tokenExpirationDate: tokenExpirationTimeStamp,
    },
    authenticate: authenticate,
    logout: logout,
    checkIsTokenExpired: checkIsTokenExpired,
    resetExpDate: resetExpDate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
