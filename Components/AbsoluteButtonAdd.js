import { Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AbsoluteButtonAdd() {
  let dim = Dimensions.get("window").height - 120;
  let dimWidth = Dimensions.get("window").width - 110;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: dim,
        left: dimWidth,
      }}
      onPress={() => navigation.navigate("AddScreen")}
    >
      <Image
        source={require("../assets/Add.png")}
        style={{
          width: 40,
          height: 40,
        }}
      />
    </TouchableOpacity>
  );
}
