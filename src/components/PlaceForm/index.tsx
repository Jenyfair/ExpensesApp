import { ScrollView } from "react-native";
import styles from "./style";
import Input from "../Input";
import ImagePicker from "../ImagePicker";
import LocationPicker from "../LocationPicker";
import { useCallback, useState } from "react";
import { Location } from "../../types/location";
import Button from "../Button";
import { BtnMode } from "../Button/type";
import { IPlace } from "../../types/place";

type PlaceFormProps = {
  onCreatePlaceHandler: (place: IPlace) => void;
};

const PlaceForm = (props: PlaceFormProps) => {
  const [title, setTitle] = useState<string>();
  const [selectedImg, setSelectedImg] = useState<string>();
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  const changeTitleHandler = (text: string) => {
    setTitle(text);
  };

  const changeImgHandler = (imgUri: string) => {
    setSelectedImg(imgUri);
  };

  const changeLocationHandler = useCallback(async (location: Location) => {
    setSelectedLocation(location);
  }, []);

  const savePlaceHandler = async () => {
    const placeData: any = {
      title: title,
      location: selectedLocation,
      imageUri: selectedImg,
    };
    props.onCreatePlaceHandler(placeData);
  };

  return (
    <ScrollView style={styles.container}>
      <Input
        label="Title"
        invalid={false}
        onChangeText={changeTitleHandler}
        value={title}
      />
      <ImagePicker onImgPicked={changeImgHandler} />
      <LocationPicker onLocationPicked={changeLocationHandler} />
      <Button btnMode={BtnMode.regular} onPress={savePlaceHandler}>
        Add this place
      </Button>
    </ScrollView>
  );
};

export default PlaceForm;
