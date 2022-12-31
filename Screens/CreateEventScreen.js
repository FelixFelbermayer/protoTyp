import React, { useState, useEffect } from "react";
import { TextInput, Button, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { db } from "../setup.js";
import { collection, addDoc } from "firebase/firestore";
import ScanButton from "../Components/ScanButton";
import { useNavigation } from "@react-navigation/native";

export default function eventcreation() {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState();
  const handleInput = (props) => {
    setEventName(props);
  };
  const handleSubmit = async () => {
    if (eventName.length > 1) {
      try {
        const docRef = await addDoc(collection(db, "events"), {
          name: eventName,
        });
        console.log("Document written with ID: ", docRef.id);
        navigation.navigate("HomeScreen");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  return (
    <BackGround>
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
          <Button
            title="Scan Code"
            onPress={() => navigation.navigate("CodeScannerScreen")}
          />
        </JoinContainer>
      </EventCreationContainer>
    </BackGround>
  );
}

const BackGround = styled.View`
  background-color: #eaeaea;
  height: 100%;
`;
const EventCreationContainer = styled.View`
  background-color: #ededed;
  margin-top: 12%
  height: 100%;
  flex-directiopn: column;
  align-content: space-between;
  height: 80%;
`;
const CreateContainer = styled.View`
  margin-top: 90px;
  disply: flex;
  height: 40%;
`;
const InputContainer = styled.View`
  height: 40px;
  margin: 40px 30px 15px 30px;
  background-color: white;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
`;
const SubmitButton = styled.View`
  margin: auto;
`;
const BackImage = styled.Image`
  width: 17px;
  height: 17px;
  margin-left: 30px;
`;
const SplitLine = styled.View`
  width: 60%;
  height: 3px;
  background-color: #e68d4b;
  margin: auto;
`;
const JoinContainer = styled.View`
  height: 40%;
  padding-top: 10%;
`;
