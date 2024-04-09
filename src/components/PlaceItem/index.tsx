import { Image, Pressable, Text, View } from "react-native";
import { IPlace } from "../../types/place";
import styles from "./style";

type PlaceItemProps = {
  place: IPlace;
  onPress: () => void;
};
const PlaceItem = ({ place, onPress }: PlaceItemProps) => {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, styles.item]}
      onPress={onPress}
    >
      <Image source={{ uri: place.imageUri }} style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.location?.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
