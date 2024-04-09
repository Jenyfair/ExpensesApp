import { Alert, Image, Text, View } from "react-native";
import styles from "./style";
import IconButton from "../IconButton";
import { fontSizeScale } from "../../util/scaling";
import { colors } from "../../constants/colors";
import {
  useForegroundPermissions,
  PermissionStatus,
  getCurrentPositionAsync,
} from "expo-location";
import { getMapPreview, getAddress } from "../../util/location";
import { useEffect, useState } from "react";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainStack";
import { Location } from "../../types/location";

type LocationPickerProps = {
  onLocationPicked: (location: Location) => void;
};

const LocationPicker = (props: LocationPickerProps) => {
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const [locationPreviewUrl, setLocationPreviewUrl] = useState<string | null>();
  const [pickedLocation, setPickedLocation] = useState<Location>();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const route = useRoute<RouteProp<MainStackParamList, "AddPlace">>();
  const isFocused = useIsFocused();

  //console.log("route params", route.params);

  const verifyPositionPermission = async () => {
    if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Check permissions",
        "You need to grant location permission to the app to be able to locate your store"
      );
      return false;
    }
    return true;
  };

  const setUserLocationHandler = async () => {
    const hasPermission = verifyPositionPermission();
    if (!hasPermission) {
      return;
    }
    const userPosition = await getCurrentPositionAsync();
    const userLocation: Location = {
      position: {
        latitude: userPosition.coords.latitude,
        longitude: userPosition.coords.longitude,
      },
    };
    setLocationPreviewUrl(
      getMapPreview(
        userLocation.position.latitude,
        userLocation.position.longitude
      )
    );
    setPickedLocation(userLocation);
  };

  const pickLocationHandler = async () => {
    navigation.navigate("Map", { location: null });
    if (pickedLocation) {
      const lat = pickedLocation.position.latitude;
      const lgt = pickedLocation.position.longitude;
      setLocationPreviewUrl(getMapPreview(lat, lgt));
    }
  };

  useEffect(() => {
    if (isFocused && route.params.location && route.params.location.position) {
      const mapPickedLocation: Location = {
        position: {
          latitude: route.params.location.position.latitude,
          longitude: route.params.location.position.longitude,
        },
      };
      setPickedLocation(mapPickedLocation);
      setLocationPreviewUrl(
        getMapPreview(
          mapPickedLocation.position.latitude,
          mapPickedLocation.position.longitude
        )
      );

      console.log("pickedLocation", pickedLocation);
    }
  }, [route.params.location, isFocused]);

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation);
        props.onLocationPicked({ ...pickedLocation, address });
      }
    };
    handleLocation();
  }, [pickedLocation, props.onLocationPicked]);

  return (
    <View style={styles.container}>
      <View style={styles.locationPreview}>
        {locationPreviewUrl ? (
          <Image source={{ uri: locationPreviewUrl }} style={styles.image} />
        ) : (
          <Text style={styles.fallbackImgText}>No selected location yet</Text>
        )}
      </View>
      <View style={styles.btnsContainer}>
        <IconButton
          icon={{
            size: fontSizeScale(18),
            name: "location",
            color: colors.primary500,
          }}
          onPress={setUserLocationHandler}
          text={"Use my location"}
          textStyle={styles.btnText}
        />
        <IconButton
          icon={{
            size: fontSizeScale(18),
            name: "map",
            color: colors.primary500,
          }}
          onPress={pickLocationHandler}
          text={"Chose a location"}
          textStyle={styles.btnText}
        />
      </View>
    </View>
  );
};

export default LocationPicker;
