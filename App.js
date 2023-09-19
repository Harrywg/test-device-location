import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import MapView, { Circle } from "react-native-maps";

export default function App() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const onPositionChange = (arg) => {
    console.log(arg);
    const { coords } = arg;
    console.log("position changed");
    const { latitude, longitude } = coords;
    const newRegion = { ...currentLocation, latitude, longitude };
    if (coords) setCurrentLocation(newRegion);
    mapRef.current.animateToRegion(newRegion, 1000);
  };

  const mapRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => console.log(currentLocation), [currentLocation]);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status !== "granted") throw new Error("permission not granted");
        return Location.watchPositionAsync(
          { enableHighAccuracy: true },
          onPositionChange
        );
      })
      .catch(console.warn);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        style={{ height: 300, width: 300 }}
      >
        <Circle
          ref={circleRef}
          center={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          radius={1000}
        ></Circle>
      </MapView>
      <Text>Test</Text>
      <Text>Latitude {currentLocation.latitude}</Text>
      <Text>Longitude {currentLocation.longitude}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
