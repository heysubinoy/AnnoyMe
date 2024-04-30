import { View, StyleSheet, ScrollView, Button } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { withTheme } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { Card, Text, Divider } from "react-native-paper";
import { Drawer } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";

const Home = ({ theme, navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { user } = useUser();
  const numberOfCards = 10;
  const handleButtonClick = () => {
    // Navigate to the new screent
    navigation.navigate("Meow");
  };

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: theme.colors.background,
      }}
    >
      <Appbar.Header >
        <Appbar.Content title="AnnoyMe" />
      </Appbar.Header>
      <ScrollView>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ margin: 10 }}
      />

      <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
      <Divider />

      <Text>Here are some things you can do:</Text>
        <Card onPress={handleButtonClick}>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
          />
        </Card>
        <Divider />
        {Array.from({ length: numberOfCards }, (_, index) => (
          <React.Fragment key={index}>
            <Card onPress={handleButtonClick}>
              <Card.Title
                title="Card Title"
                subtitle="Card Subtitle"
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
              />
            </Card>
            <Divider />
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 5,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: "beige",
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default withTheme(Home);
