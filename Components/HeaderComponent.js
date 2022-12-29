import styled from "styled-components/native";

export default function HeaderComponent() {
  return (
    <Header>
      <HeaderSectionView>
        <SortierenView>
          <SearchText>Sortieren</SearchText>
        </SortierenView>
        <SearchView>
          <SearchImage source={require("../assets/Search.png")} />
        </SearchView>
      </HeaderSectionView>
    </Header>
  );
}
const Header = styled.View`
  height: 5%;
`;
const SearchView = styled.View`
  padding: 9px;
  background-color: #454545;
  width: 33px;
  border-radius: 20px;
`;
const SearchImage = styled.Image`
  width: 15px;
  height: 15px;
`;
const SortierenView = styled.View`
  background-color: #454545;
  width: 70px;
  border-radius: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  margin-right: 5px;
`;
const SearchText = styled.Text`
  text-align: center;
  font-size: 12px;
  color: white;
`;
const HeaderSectionView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-right: 30px;
`;
