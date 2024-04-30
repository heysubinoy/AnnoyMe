import React, { useState } from "react";
import { View, FlatList, Button, StyleSheet, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { Platform } from "react-native";

const Meow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return; // Prevent sending empty messages

    const updatedMessages = [
      ...messages,
      { text: newMessage, timestamp: new Date() },
    ];
    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Title" subtitle={"Subtitle"} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
              {item.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        )}
        inverted // to display messages from bottom to top
      />

      <TextInput
        multiline
        mode="flat"
        style={styles.input}
        outlineColor="null"
        underlineColor="null"
        placeholder="Type your message..."
        value={newMessage}
        onChangeText={setNewMessage}
        right={<TextInput.Icon icon="send" onPress={handleSendMessage} />}
      />
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
