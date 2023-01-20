import { Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AbsoluteButtonAdd() {
  let dim = Dimensions.get("window").height - 130;
  let dimWidth = Dimensions.get("window").width - 60;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: dim,
        left: dimWidth,
      }}
      onPress={() => navigation.navigate("CreateEventScreen")}
    >
      <Image
        source={require("../assets/Add.png")}
        style={{
          width: 50,
          height: 50,
        }}
      />
    </TouchableOpacity>
  );
}
