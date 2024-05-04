import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, Button, StyleSheet, Text } from "react-native";
import { Appbar, Icon, MD3Colors, withTheme } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { Platform } from "react-native";
import database from "../../firebaseConfig";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useUser } from "@clerk/clerk-expo";

import {
  ref,
  set,
  push,
  serverTimestamp,
  onValue,
  onChildAdded,
} from "firebase/database";
import { Message } from "../types/MessageTypes";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
const Meow = ({ theme }) => {
  const { user } = useUser();

  const [newMessage, setNewMessage] = useState("");
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  const chatId = "chat1"; // For simplicity, we are using a hardcoded chatId
  const messageRef = ref(database, `messages/${chatId}/messages`);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    onChildAdded(messageRef, (data) => {
      if (data) {
        console.log("Data", data);
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, data.val())
        );
      }
    });
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.colors.secondaryContainer,
      backgroundImage: "url('https://source.unsplash.com/random')",
    },
    messageContainer: {
      backgroundColor: "#ffffff",
      borderRadius: 8,
      marginVertical: 5,
      marginHorizontal: 10,
      padding: 10,
      maxWidth: "70%",
    },
    messageText: {
      fontSize: 15,
    },
    timestamp: {
      fontSize: 15,
      color: "gray",
      marginTop: 5,
      alignSelf: "flex-end",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderTopWidth: 1,
      borderTopColor: "#cccccc",
      backgroundColor: "#ffffff",
      overflow: "hidden",
    },
    input: {
      borderWidth: 1,
      marginHorizontal: 10,
      marginBottom: 10,
      borderColor: "#cccccc",
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
      overflow: "hidden",
      borderBottom: 0,
    },
  });
  const onSend = (messages = []) => {
    messages.forEach((message) => {
      console.log("Yet to send Message", message);
      message.createdAt = serverTimestamp();
      push(messageRef, message);

      console.log("Message sent", message);
    });
  };
  const customSystemMessage = (props) => {
    return (
      <View style={{}}>
        <Text style={{}}>
          Your chat is secured. Remember to be cautious about what you share
          with others.
        </Text>
      </View>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: theme.colors.onSecondaryContainer,
          },
        }}
        textStyle={{
          right: {
            color: theme.colors.text,
          },
        }}
      />
    );
  };
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <MaterialCommunityIcons
          name="send-circle"
          style={{ marginBottom: 5, marginRight: 5 }}
          size={32}
          color={theme.colors.primary}
        />
      </Send>
    );
  };
  const scrollToBottomComponent = () => {
    return <Icon source="down" color={theme.colors.primary} size={32} />;
  };
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Title" subtitle={"Subtitle"} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      <GiftedChat
        messages={messages}
        renderSystemMessage={customSystemMessage}
        //showAvatarForEveryMessage={true}
        //showUserAvatar={true}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        renderBubble={(props) => renderBubble(props)}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.id,
          name: user.fullName,
          avatar: user.profileImageUrl,
        }}
        renderSend={(props) => renderSend(props)}
        alwaysShowSend
        scrollToBottomComponent={() => scrollToBottomComponent()}
        scrollToBottom
      />

      {/* <TextInput
        multiline
        mode="flat"
        style={styles.input}
        outlineColor="null"
        underlineColor="null"
        placeholder="Type your message..."
        value={newMessage}
        onChangeText={setNewMessage}
        right={<TextInput.Icon icon="send" onPress={handleSendMessage} />}
      /> */}
    </View>
  );
};

export default withTheme(Meow);
