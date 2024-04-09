import { Alert, Image, Text, View } from "react-native";

import styles from "./style";
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import IconButton from "../IconButton";
import { fontSizeScale } from "../../util/scaling";
import { colors } from "../../constants/colors";

type ImagePickerProps = {
  onImgPicked: (img: string) => void;
};

const ImagePicker = (props: ImagePickerProps) => {
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
    props.onImgPicked(image.assets[0].uri);
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
      <View>
        <IconButton
          icon={{
            size: fontSizeScale(24),
            name: "camera",
            color: colors.primary500,
          }}
          onPress={takePhotoHandler}
          text={"Take a photo"}
          textStyle={styles.btnText}
        />
      </View>
    </View>
  );
};

export default ImagePicker;
