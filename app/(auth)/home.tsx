import { View, StyleSheet, Button } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { withTheme } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Card, Text } from "react-native-paper";
import { Drawer } from "react-native-paper";
import { Searchbar } from "react-native-paper";

const Home = ({ theme, navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { user } = useUser();
  const [active, setActive] = React.useState("first");
  console.log(navigation);
  const handleButtonClick = () => {
    // Navigate to the new screen
    navigation.navigate("Meow");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

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
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
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
