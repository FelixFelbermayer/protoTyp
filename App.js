import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import HomeScreen from "./Screens/HomeScreen";
export default function App() {
  return (
    <SafeAreaView>
      <HomeScreen></HomeScreen>
    </SafeAreaView>
  );
}
