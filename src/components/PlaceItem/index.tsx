import { Image, Pressable, Text, View } from "react-native";
import { IPlace } from "../../types/place";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainStack";

type PlaceItemProps = {
  place: IPlace;
};
const PlaceItem = ({ place }: PlaceItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const placePressHandler = () => {
    navigation.navigate("PlaceDetails", { placeId: place.id });
  };
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, styles.item]}
      onPress={placePressHandler}
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
