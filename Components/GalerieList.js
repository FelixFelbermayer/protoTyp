import { Text, View, Button, FlatList, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GalerieImages } from "../Data/Galerie";
import { useEffect, useState } from "react";
import { db, storage } from "../setup";
import { getDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export default function GalerieList({ eventId }) {
  let [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImgs = async () => {
      let a = await doc(db, "events", eventId);
      let b = await getDoc(a);
      let imgs = await b.data().images;

      imgs = await Promise.all(
        imgs.map(async (e, i) => {
          let link = await getDownloadURL(ref(storage, e));
          return { id: i, link: link };
        })
      );

      setImages(imgs);
    };

    fetchImgs();
  }, [eventId]);

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
      {images.length > 0 ? (
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />
      ) : (
        ""
      )}
    </View>
  );
}
