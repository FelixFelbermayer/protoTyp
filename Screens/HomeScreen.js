import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import styled from "styled-components/native";

export default function HomeScreen() {
  return (
    <Container>
      <Header>
        <View>
          <Text>Sortieren</Text>
          <Image></Image>
        </View>
      </Header>
    </Container>
  );
}

const Container = styled.View`
  background-color: blue;
  height: 100%;
`;
const Header = styled.View`
  height: 10%;
  background-color: red;
`;
