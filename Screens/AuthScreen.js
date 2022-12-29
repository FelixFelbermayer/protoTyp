import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TextInputComponent,
  TextInputBase,
  TouchableOpacity,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { app, storage, db, auth } from "../setup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import LogoutButton from "../Components/LogoutButton";
import { useNavigation } from "@react-navigation/native";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const navigation = useNavigation();
  console.log("current user:", auth.currentUser);

  return (
    <Container>
      <Header>
        <Heading>Login</Heading>
      </Header>
      <InputContainer>
        <StyledTextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        ></StyledTextInput>
        <StyledTextInput
          value={pw}
          onChangeText={(text) => setPw(text)}
          placeholder="Password"
          secureTextEntry={true}
        ></StyledTextInput>

        <LoginButton
          onPress={() => {
            signInWithEmailAndPassword(auth, email, pw)
              .then((userCredential) => {
                // Signed in navigate
                const user = userCredential.user;
                console.log(user);
                navigation.navigate("Home");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                Alert.alert(error.code, errorMessage);
                console.log(errorCode, errorMessage);
              });
          }}
        >
          <ButtonText>Login</ButtonText>
        </LoginButton>

        <SignupButton
          onPress={() => {
            createUserWithEmailAndPassword(auth, email, pw)
              .then((userCreds) => {
                const user = userCreds.user;
                console.log(user);

                // TODO: save auth state & navigate
                // dont create user on login but on signup
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(error.code, errorMessage);
                console.log(errorCode, errorMessage);
              });
          }}
        >
          <ButtonText>Signup</ButtonText>
        </SignupButton>
        <LogoutButton></LogoutButton>
      </InputContainer>
    </Container>
  );
}

const LoginButton = styled.TouchableOpacity`
  width: 90%;
  background-color: #454545;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-top: 25px;
  border-radius: 10px;
  color: white;
`;

const SignupButton = styled.TouchableOpacity`
  width: 90%;
  background-color: #454545;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-top: 10px;
  border-radius: 10px;
  color: white;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const Container = styled.View`
  display: flex;
  height: 100%;
  width: 100%;
`;
const Header = styled.View`
  margin-top: 80px;
  height: 10%;
  display: flex;
`;

const Heading = styled.Text`
  font-size: 30px;
  color: #454545;
  margin-left: 15px;
`;

const InputContainer = styled.View`
  display: flex;
  align-items: center;
  margin-top: 100px
  flex-direction: column;
  height: 100%;
`;

const StyledTextInput = styled.TextInput`
  background-color: #e6e6e6;
  width: 90%;
  height: 50px;
  border-radius: 10px;
  padding: 5px 15px;
  margin-top: 10px;
`;
