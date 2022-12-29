import { storage, db } from "../setup";
import { Text, View, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
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

  const pickImage = async () => {
    console.log("amlk");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      selectionLimit: 0,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);

      let proms = result.assets.map((e) => {
        return new Promise((resolve, reject) => {
          let url = e.uri;
          let filename = url.substring(url.lastIndexOf("/") + 1, url.length);
          fetch(e.uri)
            .then((r) => r.blob())
            .then((b) => {
              let imgref = ref(storage, `${eventId}/${filename}`);
              uploadBytes(imgref, b).then((sn) => {
                let fullpath = sn.metadata.fullPath;

                resolve(fullpath);
              });
            })
            .catch((error) => {
              reject(error);
            });
        });
        console.log(e);
      });

      Promise.all(proms)
        .then(async (results) => {
          let eventRef = await doc(db, "events", eventId);
          results.forEach(async (r) => {
            await updateDoc(eventRef, {
              images: arrayUnion(r),
            });
          });

          console.log({ results });
          setLoading(false);
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };

  return (
    <Container>
      <Header>
        <View>
          <EventText>Feci's Poolparty</EventText>
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
        <BGButton>
          <Text>>>>>></Text>
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
