import { Text, View, Button, FlatList, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GalerieImages } from "../Data/Galerie";

export default function GalerieList() {
  let dimWidth = Dimensions.get("window").width / 3 - 22;
  const renderItem = ({ item }) => (
    <View style={{}}>
      <Image
        style={{
          width: dimWidth,
          height: undefined,
          aspectRatio: 1,
          marginBottom: 2,
        }}
        source={{
          uri: item.link,
        }}
      />
    </View>
  );

  return (
    <View
      style={{
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 2,
        height: "85%",
      }}
    >
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={GalerieImages}
        renderItem={renderItem}
        keyExtractor={(item) => item.link}
        numColumns={3}
      />
    </View>
  );
}
