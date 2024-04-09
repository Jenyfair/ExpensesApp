import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../components/Button";
import { BtnMode } from "../../components/Button/type";
import PlacesList from "../../components/PlacesList";
import { IPlace } from "../../types/place";
import { MainStackParamList } from "../../navigation/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomNavigatorParamList } from "../../navigation/BottomNavigator";
import { useContext, useEffect, useState } from "react";
import { PlacesContext } from "../../store/placesCtx";
import { fetchPlaces } from "../../util/api";
import useAxiosInterceptor from "../../hooks/useAxiosInterceptor";
import { AuthContext } from "../../store/authCtx";
import Loader from "../../components/Loader";
import ErrorOverlay from "../../components/ErrorOverlay";

type AllPlacesProp = {
  places?: IPlace[];
};

const AllPlaces = (props: AllPlacesProp) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const route = useRoute<RouteProp<BottomNavigatorParamList, "AllPlaces">>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const authCtx = useContext(AuthContext);
  const userToken = authCtx.state.token;
  const placeCtx = useContext(PlacesContext);
  const places = placeCtx.state.places;
  const { axBe } = useAxiosInterceptor();

  console.log("places", places);

  useEffect(() => {
    const getPlaces = async () => {
      setIsLoading(true);
      try {
        const places = await fetchPlaces(axBe, userToken!);
        placeCtx.setPlaces(places);
      } catch (error: any) {
        setErrorMsg("Could not fetch expenses");
        console.log("FETCHED ERROR", JSON.stringify(error));
      }
      setIsLoading(false);
    };
    getPlaces();
  }, []);

  const addPlaceHandler = () => {
    navigation.navigate("AddPlace", { location: null });
  };

  const confirmErrorHandler = () => {
    setErrorMsg(null);
  };

  if (isLoading) {
    <Loader message="Loading places, please wait" />;
  }
  if (!isLoading && errorMsg) {
    <ErrorOverlay
      message="Error while loading places"
      onConfirm={confirmErrorHandler}
    />;
  }

  return (
    <>
      <PlacesList places={places} />
      <Button btnMode={BtnMode.flat} onPress={addPlaceHandler}>
        Add new place
      </Button>
    </>
  );
};

export default AllPlaces;
