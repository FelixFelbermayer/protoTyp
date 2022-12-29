import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { app, storage, db, auth } from "../setup.js";
import { collection, addDoc } from "firebase/firestore";

export default function UploadDocumentButton() {
  return (
    <Button
      onPress={async () => {
        try {
          auth.signOut();
          console.log("logged out");
        } catch (e) {
          console.error("Error", e);
        }
      }}
      title="Logout"
    ></Button>
  );
}
