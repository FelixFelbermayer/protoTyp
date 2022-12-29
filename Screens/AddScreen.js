import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AddScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 20 }}>
      <Text>Test</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
