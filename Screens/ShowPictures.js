import { Image, Dimensions, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GalerieList from "../Components/GalerieList";
import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { storage, db } from "../setup";
import { updateDoc, getDoc, arrayUnion, doc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { ref, uploadBytesResumable } from "firebase/storage";

export default function ShowPictures({ route }) {
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
        selectionLimit: 3,
      });
      if (!result.cancelled) {
        let images = result.selected !== undefined ? result.selected : [result];
        let proms = images.map((e) => {
          return new Promise((resolve, reject) => {
            let url = e.uri;
            let filename = url.substring(url.lastIndexOf("/") + 1, url.length);
            fetch(e.uri)
              .then((r) => r.blob())
              .then((b) => {
                let imgref = ref(storage, `${eventId}/${filename}`);

                try {
                  uploadBytesResumable(imgref, b).then((sn) => {
                    let fullpath = sn.metadata.fullPath;
                    resolve(fullpath);
                  });
                } catch (e) {
                  console.log(e);
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

            setToggle(!toggle);
          })
          .catch((errors) => {
            console.log(errors);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const navigation = useNavigation();
  let dim = Dimensions.get("window").height - 130;
  let dimWidth = Dimensions.get("window").width - 90;
  let eventId = route.params.eventId;
  let ran = route.params.ran;
  console.log("Penis" + ran);
  let eId = "" + route.params.eventId;
  const [event, setEvent] = useState();
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const fetchImgs = async () => {
      let a = await doc(db, "events", eventId);
      let b = await getDoc(a);
      let data = await b.data();

      setEvent(data);
    };
    console.log("jshdkjashda");
    fetchImgs();
  }, [ran]);

  return (
    <Header>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackImage source={require("../assets/Back.png")} />
      </TouchableOpacity>
      <HeaderText>{event ? event.name : "EventName"} </HeaderText>
      <TouchableOpacity onPress={() => navigation.navigate("QRCode", { eId })}>
        <BackImage source={require("../assets/qr-code.png")} />
      </TouchableOpacity>
      <HeaderTextDate>18. Februar 2022</HeaderTextDate>
      <GalerieList eventId={eventId} ran={toggle}></GalerieList>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: dim,
          left: dimWidth,
          backgroundColor: "orange",
          borderRadius: 100,
          padding: 5,
        }}
        onPress={() => pickImage()}
      >
        <Image
          source={require("../assets/uploadNice.png")}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </TouchableOpacity>
    </Header>
  );
}
const Header = styled.View`
  margin-top: 12%;
`;
const HeaderText = styled.Text`
  margin-left: 30px;
  font-size: 30px;
  font-family: Poppins_600SemiBold;
  font-weight: bold;
  color: #454545;
  margin-top: 10px;
`;
const HeaderTextDate = styled.Text`
  margin-left: 30px;
  font-size: 16px;
  font-family: Poppins_400Regular;
  font-weight: bold;
  color: #454545;
  margin-bottom: 20px;
`;
const BackImage = styled.Image`
  width: 17px;
  height: 17px;
  margin-left: 30px;
`;
