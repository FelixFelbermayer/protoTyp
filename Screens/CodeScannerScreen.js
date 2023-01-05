import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import styled from "styled-components/native";
import { auth, db } from "../setup.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const currUser = auth.currentUser.uid;
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
    try {
      await updateDoc(eventRef, {
        members: arrayUnion(currUser),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    navigation.navigate("Home");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScanScreen>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginBottom: 1 }}
      >
        <BackImage source={require("../assets/Back.png")} />
      </TouchableOpacity>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      />
    </ScanScreen>
  );
}
const ScanScreen = styled.View`
  background-color: #eaeaea;
  padding-top: 12%;
  height: 100%;
  width: 100%;
`;
const BackImage = styled.Image`
  width: 17px;
  height: 17px;
  margin-left: 30px;
`;

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
  },
});
