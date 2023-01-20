import { storage, db } from "../setup";
import {
  Text,
  Image,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

export default ImageUpload = ({ route }) => {
  let eventId = route.params.eventId;
  const [loading, setLoading] = useState(false);

  const [event, setEvent] = useState();

  useEffect(() => {
    const fetchImgs = async () => {
      let a = await doc(db, "events", eventId);
      let b = await getDoc(a);
      let data = await b.data();

      setEvent(data);
    };

    fetchImgs();
  }, [eventId]);

  const navigation = useNavigation();
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.1,
        allowsEditing: false,
        aspect: [4, 3],
        selectionLimit: 0,
        allowsMultipleSelection: true,
        presentationStyle: "fullScreen",
      });
      if (!result.cancelled) {
        setLoading(true);
        let images = result.selected !== undefined ? result.selected : [result];
        console.log({ images });
        let proms = images.map((e) => {
          return new Promise((resolve, reject) => {
            let url = e.uri;
            let filename = url.substring(url.lastIndexOf("/") + 1, url.length);
            fetch(e.uri)
              .then((r) => r.blob())
              .then((b) => {
                let imgref = ref(storage, `${eventId}/${filename}`);
                console.log("1");
                try {
                  // uploadBytes(imgref, b).then((sn) => {
                  //   let fullpath = sn.metadata.fullPath;
                  //   console.log("2");
                  //   resolve(fullpath);
                  // });
                  uploadBytesResumable(imgref, b).then((sn) => {
                    let fullpath = sn.metadata.fullPath;
                    console.log("2");
                    resolve(fullpath);
                  });

                  // .catch((e) => console.log(e, "asd"));
                } catch (e) {
                  console.log(e);
                  console.log("penis");
                }
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          });
        });

        Promise.all(proms)
          .then(async (results) => {
            let eventRef = await doc(db, "events", eventId);
            results.forEach(async (r) => {
              console.log("3");
              await updateDoc(eventRef, {
                images: arrayUnion(r),
              });
            });

            setLoading(false);
          })
          .catch((errors) => {
            console.log(errors);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 50 }}
        >
          <BackImage source={require("../assets/Back.png")} />
        </TouchableOpacity>
        <View>
          <EventText>
            {event !== undefined ? event.name : "Cooles Event"}
          </EventText>
        </View>
      </Header>
      <CenterView>
        <UploadIcon onPress={() => pickImage()}>
          <Icon source={require("../assets/upload.png")}></Icon>
        </UploadIcon>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00"></ActivityIndicator>
        ) : (
          ""
        )}
        <BGButton
          onPress={() =>
            navigation.navigate("Galerie", {
              eventId,
            })
          }
        >
          <Text>Zum Fotoalbum</Text>
        </BGButton>
      </CenterView>
    </Container>
  );
};

const CenterView = styled.View`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 90%;
`;

const EventText = styled.Text`
  margin-left: 30px;
  font-size: 30px;
  font-family: Poppins_600SemiBold;
  font-weight: bold;
  color: #454545;
  margin-top: 40px;
`;

const Container = styled.View`
  height: 100%;
`;

const Icon = styled.Image`
  width: 50%;
  height: 50%;
`;

const BGButton = styled.TouchableOpacity`
  background-color: orange;
  padding: 0px 25px 0px 25px;
  height: 20px;
  border-radius: 20px;
`;

const UploadIcon = styled.TouchableOpacity`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.View`
  height: 10%;
`;
const BackImage = styled.Image`
  width: 17px;
  height: 17px;
  margin-left: 30px;
`;
