import { Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AbsoluteButtonJoin() {
  let dimJoin = Dimensions.get("window").height - 130;
  let dimWidthJoin = Dimensions.get("window").width - 60;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: dimJoin,
        left: dimWidthJoin,
      }}
      onPress={() => navigation.navigate("CreateEventScreen")}
    >
      <Image
        source={require("../assets/Join.png")}
        style={{
          width: 50,
          height: 50,
        }}
      />
    </TouchableOpacity>
  );
}
