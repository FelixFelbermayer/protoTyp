import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import HomeScreen from "./Screens/HomeScreen";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddScreen from "./Screens/AddScreen";
import JoinScreen from "./Screens/JoinScreen";
import { auth } from "./setup.js";
import AuthScreen from "./Screens/AuthScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  if (auth.currentUser) {
    const Stack = createNativeStackNavigator();
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <AuthScreen></AuthScreen>;
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
