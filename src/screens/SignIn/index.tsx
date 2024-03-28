import { Text, View } from "react-native";
import styles from "./style";
import AuthContainer from "../../components/AuthContainer";
import { createUser } from "../../util/api";
import { useContext, useState } from "react";
import Loader from "../../components/Loader";
import ErrorOverlay from "../../components/ErrorOverlay";
import { AuthContext } from "../../store/authCtx";

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const authCtx = useContext(AuthContext);

  const handleSignUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token, refreshToken, tokenExpirationDate } = await createUser(
        email,
        password
      );
      authCtx.authenticate(token, refreshToken, tokenExpirationDate);
    } catch (error) {
      setLoading(false);
      setError("Error duing user creation, please try again later");
      console.error(error);
    }
  };

  const handleErrorConfim = () => {
    setError(null);
  };

  if (loading) {
    return <Loader />;
  }

  if (error && !loading) {
    return <ErrorOverlay message={error} onConfirm={handleErrorConfim} />;
  }

  return <AuthContainer isLogin={false} onAuthenticate={handleSignUp} />;
};

export default SignIn;
