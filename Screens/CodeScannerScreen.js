import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import styled from "styled-components/native";
import { db } from "../setup.js";
import { doc, collection, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    joinEvent(data);
  };

  const joinEvent = async (code) => {
    let eventRef = await doc(db, "events", code);
    console.log(eventRef);
    try {
      await updateDoc(eventRef, {
        users: arrayUnion("Test"),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    navigation.navigate("HomeScreen");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScanScreen>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </ScanScreen>
  );
}
const ScanScreen = styled.View`
  height: 100%;
  width: 100%;
`;
