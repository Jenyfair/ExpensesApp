import { IExpense } from "../types/expense";
import {
  BACKEND_URL,
  FIREBASE_AUTH_URL,
  REFRESH_TOKEN_URL,
} from "../constants/config";
import { FIREBASE_API_KEY } from "../constants/secret";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTokenExpirationTime } from "./date";
import axios, { AxiosInstance } from "axios";

export enum AuthMode {
  signIn = "signUp",
  login = "signInWithPassword",
}

export const authUser = async (
  mode: AuthMode,
  email: string,
  password: string
) => {
  const response = await axios.post(
    `${FIREBASE_AUTH_URL}${mode}?key=${FIREBASE_API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  console.log("AUTH Data", response.data);

  const token = response.data.idToken;
  const refreshToken = response.data.refreshToken;
  const expiresIn = response.data.expiresIn;
  const tokenExpirationDate = getTokenExpirationTime(expiresIn);
  console.log("AUTH FUNCTION tokenExpirationDate:", tokenExpirationDate);

  await AsyncStorage.setItem("refreshToken", refreshToken);
  await AsyncStorage.setItem("token", token);
  await AsyncStorage.setItem(
    "tokenExpirationDate",
    tokenExpirationDate.toString()
  );

  return { refreshToken, token, tokenExpirationDate };
};

export const refreshExpiredToken = async (
  axiosBackendInstance: AxiosInstance,
  refreshToken: string
) => {
  const response = await axiosBackendInstance.post(REFRESH_TOKEN_URL, {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
  const newTokens = {
    token: response.data.id_token,
    refreshToken: response.data.refresh_token,
    tokenExpirationDate: getTokenExpirationTime(response.data.expires_in),
  };
  console.log(
    "expirationDate on refresh function:",
    newTokens.tokenExpirationDate
  );

  return newTokens;
};

export const createUser = (email: string, password: string) => {
  return authUser(AuthMode.signIn, email, password);
};

export const loginUser = (email: string, password: string) => {
  return authUser(AuthMode.login, email, password);
};

export const storeExpense = async (
  axiosBackendInstance: AxiosInstance,
  expenseData: IExpense,
  userToken: string
) => {
  const response = await axiosBackendInstance.post(
    BACKEND_URL + "/expenses.json?auth=" + userToken,
    expenseData
  );

  const id = response.data.name;
  return id;
};

export const fetchExpenses = async (
  axiosBackendInstance: AxiosInstance,
  userToken: string
) => {
  const response = await axiosBackendInstance.get(
    BACKEND_URL + "/expenses.json?auth=" + userToken
  );
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      name: response.data[key].name,
    };
    expenses.push(expenseObj);
  }
  //console.log("expenses", expenses);

  return expenses;
};

export const updateExpense = (
  axiosBackendInstance: AxiosInstance,
  id: string,
  expenseData: IExpense,
  userToken: string
) => {
  return axiosBackendInstance.put(
    BACKEND_URL + `/expenses/${id}.json?auth=${userToken}`,
    expenseData
  );
};

export const deleteExpense = (
  axiosBackendInstance: AxiosInstance,
  id: string,
  userToken: string
) => {
  return axiosBackendInstance.delete(
    BACKEND_URL + `/expenses/${id}.json?auth=${userToken}`
  );
};
