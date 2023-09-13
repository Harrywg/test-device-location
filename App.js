import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
export default function App() {
  function requestPermission() {
    return Location.requestForegroundPermissionsAsync();
  }

  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    requestPermission()
      .then(({ status }) => {
        if (status !== "granted") throw new Error("permission not granted");
        Location.getCurrentPositionAsync()
          .then(({ coords }) => {
            setCurrentLocation(coords);
            console.log(coords);
          })
          .catch(console.warn);
      })
      .catch(console.warn);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>Test</Text>
      {Object.keys(currentLocation).map((key) => {
        return <Text>{`${key} : ${currentLocation[key]}`}</Text>;
      })}
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
