import { FIREBASE_API_KEY } from "./secret";

export const BACKEND_URL =
  "https://expensesapp-9034f-default-rtdb.europe-west1.firebasedatabase.app";

export const FIREBASE_AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:`;

export const REFRESH_TOKEN_URL = `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`;
