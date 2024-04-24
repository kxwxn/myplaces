import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { IconButton } from "../components/UI/IconButton";
import { useNavigation } from "@react-navigation/native";

export const Map = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState();
  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (e) => {
    const lat = e.nativeEvent.coordinate.latitude;
    const lon = e.nativeEvent.coordinate.longitude;
    console.log(lat, lon);
    setSelectedLocation({ lat: lat, lon: lon });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectLocationHandler) {
      Alert.alert("No location picked", "Pick a location first");
      return;
    }
    navigation.navigate("AddPlace", { pickedLocation: selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
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
      {selectedLocation && (
        <Marker
          title="Add this location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lon,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
