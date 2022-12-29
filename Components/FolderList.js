import { StatusBar } from "expo-status-bar";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FolderData } from "../Data/Folder";
import { useNavigation } from "@react-navigation/native";

export default function FolderList() {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <FolderTouch onPress={() => navigation.navigate("Galerie")}>
      <EventImage source={item.link} />
    </FolderTouch>
  );

  return (
    <FolderView>
      <FlatList
        data={FolderData}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </FolderView>
  );
}
const EventImage = styled.Image`
  width: 150px;
  height: 150px;
`;

const FolderView = styled.View`
  margin-left: 30px;
  height: 100%;
`;
const FolderTouch = styled.TouchableOpacity``;
