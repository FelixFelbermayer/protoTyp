import React, { useState, useEffect } from "react";
import { TextInput, Button, TouchableOpacity } from "react-native";
import uuid from "react-native-uuid";
import QRCode from "react-native-qrcode-svg";
import styled from "styled-components/native";
import { collection, getDocs } from "firebase/firestore";
import ScanButton from "../Components/ScanButton";

export default function eventcreation({ navigation }) {
  const [eventName, setEventName] = useState();
  const [eventCode, setEvenCode] = useState(uuid.v4());
  const handleInput = (props) => {
    setEventName(props);
  };
  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "events"), {
        name: eventName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <EventCreationContainer>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackImage source={require("../assets/Back.png")} />
      </TouchableOpacity>
      <CreateContainer>
        <InputContainer>
          <TextInput
            accessible={true}
            accessibilityLabel="Text input field"
            accessibilityHint="Input Event name"
            placeholder="Your Event Name"
            autoCapitalize="none"
            onChangeText={(text) => handleInput(text)}
          />
        </InputContainer>
        <SubmitButton>
          <Button title="Create Event" onPress={() => handleSubmit()} />
        </SubmitButton>
      </CreateContainer>
      <SplitLine />
      <JoinContainer>
        <ScanButton />
      </JoinContainer>
    </EventCreationContainer>
  );
}

const EventCreationContainer = styled.View`
  background-color: #ededed;
  margin-top: 12%
  height: 100%;
  flex-directiopn: column;
  align-content: space around;
  height: 80%;
`;

const CreateContainer = styled.View`
  margin-top: 90px;
  disply: flex;
`;

const InputContainer = styled.View`
  height: 40px;
  margin: 40px 30px 15px 30px;
  background-color: white;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
`;
const Code = styled.View`
  margin: auto;
`;
const SubmitButton = styled.View`
  margin: auto;
`;
const BackImage = styled.Image`
  width: 17px;
  height: 17px;
  margin-left: 30px;
`;
const SplitLine = styled.Image`
  width: 40%;
  height: 10px;
  background-color: #e68d4b;
`;
const JoinContainer = styled.Image`
  height: 40%;
`;
