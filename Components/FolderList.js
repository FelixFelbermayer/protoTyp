import { StatusBar } from "expo-status-bar";
import { FlatList, TouchableOpacity, Image, Text } from "react-native";
import styled from "styled-components/native";
import { FolderData } from "../Data/Folder";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../setup";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export default function FolderList() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchifetch = async () => {
      console.log(auth.currentUser.uid);
      let qref = collection(db, "events");
      const q = query(
        qref,
        where("members", "array-contains", auth.currentUser.uid)
      );
      let proms = [];
      let a = (await getDocs(q)).forEach((doc) => {
        let prom = new Promise((resolve, reject) => {
          if(doc.data().images.length > 0){
            getDownloadURL(ref(storage, doc.data().images[0]))
              .then((url) => {
                resolve({
                  id: doc.id,
                  link: url,
                  name: doc.data().name,
                });
              })
              .catch((e) => {
                resolve({
                  id: doc.id,
                  link: null,
                  name: doc.data().name,
                })
              });
          }else{
            resolve({
              id: doc.id,
              link: null,
              name: doc.data().name,
            })
          }
        });
        proms.push(prom);
      });
      Promise.all(proms).then((b) => {
        setEvents(b);
      });
    };

    fetchifetch();
  }, []);

  console.log({ events });

  const renderItem = ({ item }) => {
    console.log({ item });
    return (
      <FolderTouch
        onPress={() =>
          navigation.navigate("Galerie", {
            eventId: item.id,
          })
        }
      >
        <Text>{item.name}</Text>
        
        <EventImage source={ item.link != null ? { uri: item.link } : require('../assets/Folder.png')} />
      </FolderTouch>
    );
  };

  if (events.length > 0) {
    return (
      <FolderView>
        <FlatList
          data={events}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </FolderView>
    );
  }
}
const EventImage = styled.Image`
  width: 150px;
  height: 150px;
`;

const FolderView = styled.View`
  margin-left: 30px;
  height: 100%;
`;
const FolderTouch = styled.TouchableOpacity``;
