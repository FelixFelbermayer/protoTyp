import {
  Text,
  View,
  Button,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GalerieImages } from "../Data/Galerie";
import GalerieList from "../Components/GalerieList";
import styled from "styled-components/native";
export default function ShowPictures() {
  const navigation = useNavigation();

  return (
    <Header>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackImage source={require("../assets/Back.png")} />
      </TouchableOpacity>
      <HeaderText>Citybeats</HeaderText>
      <HeaderTextDate>18. Februar 2022</HeaderTextDate>
      <GalerieList></GalerieList>
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
