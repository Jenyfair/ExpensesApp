import { Image, ScrollView, Text, View } from "react-native";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import { horizontalScale } from "../../util/scaling";
import { colors } from "../../constants/colors";
import { PlaceDetailsProp } from "../../navigation/MainStack";
import { useContext } from "react";
import { PlacesContext } from "../../store/placesCtx";
import styles from "./style";

const PlaceDetails = ({ navigation, route }: PlaceDetailsProp) => {
  const placeId = route.params.placeId;
  const placeCtx = useContext(PlacesContext);
  const selectedPlace = placeCtx.state.places.find(
    (place) => place.id === placeId
  );
  console.log("selectedPlace", selectedPlace);

  const viewOnMapHandler = () => {
    navigation.navigate("Map", { location: selectedPlace?.location });
  };

  if (selectedPlace === null) {
    throw new Error("Place not found");
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: selectedPlace?.imageUri }} style={styles.image} />
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{selectedPlace?.location?.address}</Text>
      </View>
      <IconButton
        icon={{
          name: "map-sharp",
          size: horizontalScale(14),
          color: colors.primary500,
        }}
        text="View on Map"
        onPress={viewOnMapHandler}
      />
    </ScrollView>
  );
};

export default PlaceDetails;
