import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import styled from "styled-components/native";
import HeaderComponent from "../Components/HeaderComponent";
import FolderList from "../Components/FolderList";
import AbsoluteButtonJoin from "../Components/AbsoluteButtonJoin";
import AbsoluteButtonAdd from "../Components/AbsoluteButtonAdd";

export default function HomeScreen({ navigation }) {
  return (
    <Container>
      <HeaderComponent></HeaderComponent>
      <EventText>Eventbilder</EventText>
      <FolderList></FolderList>
      <AbsoluteButtonAdd></AbsoluteButtonAdd>
    </Container>
  );
}

const Container = styled.View`
  height: 100%;
  margin-top: 12%;
`;
const EventText = styled.Text`
  margin-left: 30px;
  font-size: 30px;
  font-family: Poppins_600SemiBold;
  font-weight: bold;
  color: #454545;
  margin-top: 10px;
`;
