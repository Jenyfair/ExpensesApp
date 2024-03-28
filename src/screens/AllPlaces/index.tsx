import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import { BtnMode } from "../../components/Button/type";
import PlacesList from "../../components/PlacesList";
import { AllPlacesScreenProp } from "../../navigation/BottomNavigator";
import { IPlace } from "../../types/place";
import AddPlace from "../AddPlace";
import { MainStackParamList } from "../../navigation/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const DUMMY_PLACES: IPlace[] = [];

const AllPlaces = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const addPlaceHandler = () => {
    navigation.navigate("AddPlace");
  };
  return (
    <>
      <PlacesList places={DUMMY_PLACES} />
      <Button btnMode={BtnMode.flat} onPress={addPlaceHandler}>
        Add new place
      </Button>
    </>
  );
};

export default AllPlaces;
