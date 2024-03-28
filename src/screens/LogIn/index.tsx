import { View } from "react-native";
import styles from "./style";
import AuthContainer from "../../components/AuthContainer";
import { loginUser } from "../../util/api";
import { useContext, useState } from "react";
import Loader from "../../components/Loader";
import ErrorOverlay from "../../components/ErrorOverlay";
import { AuthContext } from "../../store/authCtx";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const authCtx = useContext(AuthContext);

  const handleLogin = async (email: string, password: string) => {
    console.log("IN LOGIN FUNCTION");

    setLoading(true);
    try {
      const { token, refreshToken, tokenExpirationDate } = await loginUser(
        email,
        password
      );

      authCtx.authenticate(token, refreshToken, tokenExpirationDate);
    } catch (error) {
      setLoading(false);
      setError("Error on login proccess, please try again later");
    }
  };

  const handleConfirmError = () => {
    setError(null);
  };

  if (loading) {
    return <Loader message="Login in process, please wait" />;
  }

  if (error && !loading) {
    return <ErrorOverlay message={error} onConfirm={handleConfirmError} />;
  }

  return (
    <View style={styles.container}>
      <AuthContainer isLogin={true} onAuthenticate={handleLogin} />
    </View>
  );
};

export default Login;
