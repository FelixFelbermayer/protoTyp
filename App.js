import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import HomeScreen from "./Screens/HomeScreen";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddScreen from "./Screens/AddScreen";
import JoinScreen from "./Screens/JoinScreen";
import { auth } from "./setup.js";
import AuthScreen from "./Screens/AuthScreen";
import ShowPictures from "./Screens/ShowPictures";
import ImageUpload from "./Screens/ImageUpload";
import CreateEventScreen from "./Screens/CreateEventScreen";
import CodeScannerScreen from "./Screens/CodeScannerScreen";
import QRCode from "./Screens/QRCode";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();
  if (auth.currentUser) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddScreen" component={AddScreen} />
          <Stack.Screen name="JoinScreen" component={JoinScreen} />
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="Galerie" component={ShowPictures} />
          <Stack.Screen name="ImageUpload" component={ImageUpload} />
          <Stack.Screen name="QRCode" component={QRCode} />
          <Stack.Screen
            name="CreateEventScreen"
            component={CreateEventScreen}
          />
          <Stack.Screen
            name="CodeScannerScreen"
            component={CodeScannerScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddScreen" component={AddScreen} />
          <Stack.Screen name="JoinScreen" component={JoinScreen} />
          <Stack.Screen name="Galerie" component={ShowPictures} />
          <Stack.Screen name="ImageUpload" component={ImageUpload} />
          <Stack.Screen name="QRCode" component={QRCode} />
          <Stack.Screen
            name="CreateEventScreen"
            component={CreateEventScreen}
          />
          <Stack.Screen
            name="CodeScannerScreen"
            component={CodeScannerScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
