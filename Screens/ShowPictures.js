import { Image, Dimensions, TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GalerieImages } from "../Data/Galerie";
import GalerieList from "../Components/GalerieList";
import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { db } from "../setup";
import { getDoc, doc } from "firebase/firestore";
import { getFreeDiskStorageAsync } from "expo-file-system";
import React from "react";
export default function ShowPictures({ route }) {
  //brauchen wir dann um beim go back zu aktualisieren
  // React.useEffect(() => {
  //   const focusHandler = navigation.addListener("focus", () => {
  //     Alert.alert("Refreshed");
  //   });

  //   return focusHandler;
  // }, [navigation]);

  const navigation = useNavigation();
  let dim = Dimensions.get("window").height - 130;
  let dimWidth = Dimensions.get("window").width - 90;
  let eventId = route.params.eventId;
  let ran = route.params.ran;
  console.log("Penis" + ran);
  let eId = "" + route.params.eventId;
  const [event, setEvent] = useState();

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
      <GalerieList eventId={eventId} ran={ran}></GalerieList>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: dim,
          left: dimWidth,
          backgroundColor: "orange",
          borderRadius: 100,
          padding: 5,
        }}
        onPress={() =>
          navigation.navigate("ImageUpload", {
            eventId,
          })
        }
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
