import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { app, storage, db } from "./setup.js";
import { collection, addDoc } from "firebase/firestore";

export default function UploadDocumentButton() {
  return (
    <Button
      onPress={async () => {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            first: "Alan",
            last: "Touring",
            born: 1912,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }}
      title="Click"
    ></Button>
  );
}
