import React, { useState } from "react";
import { TextInput, TouchableOpacity, Text, Image } from "react-native";
import styled from "styled-components/native";
import { db } from "../setup.js";
import { collection, addDoc } from "firebase/firestore";
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
          members: [],
          images: [],
        });
        console.log("Document written with ID: ", docRef.id);
        navigation.navigate("Home");
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
            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text style={{ color: "white" }}>Create Event</Text>
            </TouchableOpacity>
          </SubmitButton>
        </CreateContainer>
        <SplitLine />
        <JoinContainer>
          <TouchableOpacity
            style={{
              position: "relative",
              top: "35%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("CodeScannerScreen")}
          >
            <Image
              source={require("../assets/Join.png")}
              style={{
                width: 60,
                height: 60,
              }}
            />
          </TouchableOpacity>
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
  margin-top: 12%;
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
  color: white;
  background-color: #e68d4b;
  padding: 10px;
  border-radius: 5px;
`;
const BackImage = styled.Image`
  width: 17px;
  height: 17px;
  margin-left: 30px;
`;
const SplitLine = styled.View`
  width: 60%;
  margin: auto;
  border-top-width: 4px;
  border-top-color: #e68d4b;
  border-top-style: dotted;
`;
const JoinContainer = styled.View`
  height: 40%;
  padding-top: 10%;
`;
