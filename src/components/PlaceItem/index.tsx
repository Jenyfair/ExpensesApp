import { Image, Pressable, Text, View } from "react-native";
import { IPlace } from "../../types/place";

type PlaceItemProps = {
  place: IPlace;
  onPress: () => void;
};
const PlaceItem = ({ place, onPress }: PlaceItemProps) => {
  return (
    <Pressable onPress={onPress}>
      {/* <Image source={{ uri: place.imageUri }} /> */}
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
