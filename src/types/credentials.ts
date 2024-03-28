export interface ICredentials {
  email: string;
  password: string;
  confirmEmail: string;
  confirmPassword: string;
}

export type validCredential = {
  email: boolean;
  password: boolean;
  confirmEmail: boolean;
  confirmPassword: boolean;
};
