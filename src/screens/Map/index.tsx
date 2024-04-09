import MapView, { MapPressEvent, Marker } from "react-native-maps";
import styles from "./style";
import { useCallback, useLayoutEffect, useState } from "react";
import { Location } from "../../types/location";
import { Alert } from "react-native";
import { MapProp } from "../../navigation/MainStack";
import IconButton from "../../components/IconButton";
import { fontSizeScale } from "../../util/scaling";

const Map = ({ navigation }: MapProp) => {
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapPressEvent) => {
    //console.log("click on map event", event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lgt = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      position: {
        latitude: lat,
        longitude: lgt,
      },
    });

    return selectedLocation;
  };
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked", "Please chose a location");
      return;
    }
    navigation.navigate("AddPlace", { location: selectedLocation });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon={{
            size: fontSizeScale(24),
            name: "save-sharp",
            color: tintColor,
          }}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && <Marker coordinate={selectedLocation.position} />}
    </MapView>
  );
};

export default Map;
