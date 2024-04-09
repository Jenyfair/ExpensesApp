import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PlaceForm from "../../components/PlaceForm";
import { IPlace } from "../../types/place";
import { useNavigation } from "@react-navigation/native";
import { BottomNavigatorParamList } from "../../navigation/BottomNavigator";
import { useContext, useState } from "react";
import { storePlace } from "../../util/api";
import useAxiosInterceptor from "../../hooks/useAxiosInterceptor";
import { AuthContext } from "../../store/authCtx";
import { PlacesContext } from "../../store/placesCtx";

const AddPlace = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomNavigatorParamList>>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { axBe } = useAxiosInterceptor();
  const authCtx = useContext(AuthContext);
  const placeCtx = useContext(PlacesContext);
  const userToken = authCtx.state.token;
  if (userToken === null) {
    throw new Error("Can not edit if not connected");
  }
  const createPlace = async (place: IPlace) => {
    setIsLoading(true);
    try {
      const id = await storePlace(axBe, place, userToken);
      placeCtx.addPlace({ ...place, id: id });
    } catch (error) {
      setIsLoading(false);
      setErrorMsg("Error while adding place");
    }

    navigation.navigate("AllPlaces", { place: place });
    console.log("place", place);
  };
  return <PlaceForm onCreatePlaceHandler={createPlace} />;
};

export default AddPlace;
