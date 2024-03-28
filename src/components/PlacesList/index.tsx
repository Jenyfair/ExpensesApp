import { FlatList, Text, View } from "react-native";
import { IPlace } from "../../types/place";
import PlaceItem from "../PlaceItem";
import styles from "./style";
import React from "react";

type PlaceListProps = {
  places: IPlace[] | undefined;
};

const PlacesList = (props: PlaceListProps) => {
  const onPlacePress = () => {};
  if (!props.places || props.places?.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>No place registered yet</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={props.places}
      keyExtractor={(place: IPlace) => place.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onPress={onPlacePress} />
      )}
    />
  );
};

export default PlacesList;
