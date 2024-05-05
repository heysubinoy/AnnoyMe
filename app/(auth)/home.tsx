import { View, StyleSheet, ScrollView, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { withTheme } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { Card, Text, Divider } from "react-native-paper";
import { Drawer } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import {
  ref,
  set,
  push,
  serverTimestamp,
  onValue,
  onChildAdded,
  orderByChild,
  query,
  equalTo,
} from "firebase/database";
import database from "../../firebaseConfig";
const Home = ({ theme, navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { user } = useUser();
  const userId = user.id;
  console.log(user.id);
  const numberOfCards = 10;
  const handleButtonClick = () => {
    // Navigate to the new screent
    navigation.navigate("Meow");
  };
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatsRef = ref(database, `chats`);
  const userChatsQuery = query(
    chatsRef,
    orderByChild(`participants/${userId}`),
    equalTo(true)
  );
  useEffect(() => {
    setLoading(true);
    onValue(userChatsQuery, (chatSnapshot) => {
      const newChats = [];
      chatSnapshot.forEach((chatSnapshot) => {
        const chatId = chatSnapshot.key;
        const chatData = chatSnapshot.val();
        newChats.push(chatId);
        console.log("New chat ID:", chatId);
        console.log("New chat data:", chatData);
      });
      setChats(newChats);
    });
    setLoading(false);
  }, []);
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: theme.colors.background,
      }}
    >
      <Appbar.Header>
        <Appbar.Content title="AnnoyMe" />
      </Appbar.Header>
      <ScrollView>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ margin: 10 }}
        />

        <Divider />
        {!loading &&
          chats.map((c) => (
            <React.Fragment key={c}>
              <Card onPress={handleButtonClick}>
                <Card.Title
                  title={c}
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



export default withTheme(Home);
