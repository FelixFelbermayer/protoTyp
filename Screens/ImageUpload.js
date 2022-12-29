import { StatusBar } from "expo-status-bar";
import { imagesRef, storage } from "../setup";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import uuid from "react-native-uuid";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes } from "firebase/storage";
import { FileSystem } from "react-native-file-access";
import { useState } from "react";
import { uuidv4 } from "@firebase/util";

export default ImageUpload = () => {
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
          fetch(e.uri)
            .then((r) => r.blob())
            .then((b) => {
              let imgref = ref(storage, uuid.v4());
              setTimeout(() => {
                uploadBytes(imgref, b).then((sn) => {
                  console.log(sn, "upload file");
                  resolve(e);
                });
              }, 1000);
            })
            .catch((error) => {
              reject(error);
            });
        });
        console.log(e);
      });

      Promise.all(proms)
        .then(() => {
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
          <Text>Imageupload</Text>
          <Image></Image>
        </View>
      </Header>
      <UploadIcon onPress={() => pickImage()}>
        <Icon source={require("../assets/upload.png")}></Icon>
      </UploadIcon>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00"></ActivityIndicator>
      ) : (
        ""
      )}
      <TouchableOpacity>
        <Text>>>>>></Text>
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  height: 100%;
`;

const Icon = styled.Image`
  width: 70%;
  height: 70%;
`;

const UploadIcon = styled.TouchableOpacity`
  height: 200px;
  width: 200px;
  border-radius: 100px;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.View`
  height: 10%;
  background-color: red;
`;
