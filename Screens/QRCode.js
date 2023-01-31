import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";

export default function eventcreation({ route }) {
  const navigation = useNavigation();
  let eventCode = route.params.eId;
  console.log("============");
  console.log(eventCode);
  console.log("============");
  return (
    <EventCreationContainer>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackImage source={require("../assets/Back.png")} />
      </TouchableOpacity>
      <EventMain>
        <Code>
          <QRCode value={eventCode} size={200} />
        </Code>
      </EventMain>
    </EventCreationContainer>
  );
}

const EventCreationContainer = styled.View`
  background-color: #ededed;
  height: 100%;
  margin-top: 12%;
`;

const EventMain = styled.View`
  disply: flex;
  flex-directiopn: column;
  align-content: space-around;
  height: 80%;
`;

const Code = styled.View`
  margin: auto;
`;

const BackImage = styled.Image`
  width: 17px;
  height: 17px;
  margin-left: 30px;
`;
