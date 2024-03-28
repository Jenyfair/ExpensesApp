import { useContext, useEffect } from "react";
import { AuthContext } from "../store/authCtx";
import { refreshExpiredToken } from "../util/api";
import { BACKEND_URL } from "../constants/config";
import axios from "axios";

export const axiosBackendInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const useAxiosInterceptor = () => {
  const authCtx = useContext(AuthContext);
  const { token, refreshToken } = authCtx.state;
  const tokenExpirationDate = Number(authCtx.state.tokenExpirationDate);

  const updateTokensInterceptor = async () => {
    console.log(
      "updating tokens if needed - time remaining:",
      Date.now() - tokenExpirationDate
    );

    const isTokenExpired = authCtx.checkIsTokenExpired(
      Number(tokenExpirationDate)
    );
    if (isTokenExpired) {
      const newTokens = await refreshExpiredToken(
        axiosBackendInstance,
        refreshToken!
      );
      authCtx.authenticate(
        newTokens.token,
        newTokens.refreshToken,
        newTokens.tokenExpirationDate
      );
    }
  };
  useEffect(() => {
    updateTokensInterceptor();
  }, [token]);

  return { axBe: axiosBackendInstance };
};

export default useAxiosInterceptor;
