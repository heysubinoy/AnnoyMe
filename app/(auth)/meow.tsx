import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, Button, StyleSheet, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { Platform } from "react-native";
import database from "../../firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { ref, set, push, serverTimestamp, onValue } from "firebase/database";
import { Message } from "../types/MessageTypes";
import { GiftedChat } from "react-native-gifted-chat";
const Meow = () => {
  const { user } = useUser();

  const [newMessage, setNewMessage] = useState("");
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  const chatId = "chat1"; // For simplicity, we are using a hardcoded chatId
  const messageRef = ref(database, `chats/${chatId}/allnew`);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    onValue(messageRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.values(data);
        const messagesExceptLast = messages;
        setMessages(messagesExceptLast);
      }
    });
  }, []);

  const onSend = (messages = []) => {
    messages.forEach((message) => {
      // Send the message to the backend
      push(messageRef, message);
      console.log("Message sent", message);
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
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
        //showAvatarForEveryMessage={true}
        //showUserAvatar={true}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.id,
          name: user.fullName,
          avatar: user.profileImageUrl,
        }}
        alwaysShowSend
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
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

export default Meow;
