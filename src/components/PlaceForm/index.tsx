import { ScrollView, Text, View } from "react-native";
import styles from "./style";
import Input from "../Input";
import ImagePicker from "../ImagePicker";

const PlaceForm = () => {
  return (
    <ScrollView style={styles.container}>
      <Input label="Title" invalid={false} />
      <ImagePicker />
    </ScrollView>
  );
};

export default PlaceForm;
