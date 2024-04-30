import { View, StyleSheet, Button } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { withTheme } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Card, Text } from "react-native-paper";
import { Drawer } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";

const Home = ({ theme, navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { user } = useUser();

  console.log(navigation);
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
      <Appbar.Header>
        <Appbar.Content title="My awesome app" />
      </Appbar.Header>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ margin: 10 }}
      />

      <Card style={styles.container}>
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
      </Card>
      <Card style={styles.container}>
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
      </Card>
      <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>

      {/* Button to navigate to a new screen */}
      <Button title="Go to New Screen" onPress={handleButtonClick} />
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
