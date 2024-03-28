import { Alert, Image, Text, View } from "react-native";
import Button from "../Button";
import { BtnMode } from "../Button/type";
import styles from "./style";
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";

const ImagePicker = () => {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [pickedImg, setPickedImg] = useState<string>("");
  const verifyCameraPermission = async () => {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Check permissions",
        "Please allow the app to access your camera"
      );
      return false;
    }
    return true;
  };

  const takePhotoHandler = async () => {
    const hasPermission = await verifyCameraPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.assets) {
      return;
    }
    setPickedImg(image.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>
        {!pickedImg && (
          <Text style={styles.fallbackImgText}>No image selected yet</Text>
        )}
        {pickedImg && (
          <Image source={{ uri: pickedImg }} style={styles.image} />
        )}
      </View>
      <View style={styles.btnContainer}>
        <Button btnMode={BtnMode.regular} onPress={takePhotoHandler}>
          Take a photo
        </Button>
      </View>
    </View>
  );
};

export default ImagePicker;
