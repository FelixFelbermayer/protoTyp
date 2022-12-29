import { StatusBar } from "expo-status-bar";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { FolderData } from "../Data/Folder";

export default function FolderList() {
  const renderItem = ({ item }) => <EventImage source={item.link} />;
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
