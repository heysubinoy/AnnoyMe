import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, TextInput, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Appbar, Icon, MD3Colors, withTheme } from "react-native-paper";
import { Platform, StyleSheet } from "react-native";
import database from "../../firebaseConfig";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useUser } from "@clerk/clerk-expo";
import ReplyMessageBar from "../components/ReplyMessageBar";
import {
  ref,
  set,
  push,
  serverTimestamp,
  onValue,
  onChildAdded,
} from "firebase/database";
import { Message } from "../types/MessageTypes";
import ChatMessageBox from "../components/ChatMessageBox";
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
  SystemMessage,
  ComposerProps,
  Composer,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Swipeable } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
const Meow = ({ theme }) => {
  const { user } = useUser();
  const [borderRadius, setBorderRadius] = useState(50); // Initial border radius
  const [numLines, setNumLines] = useState(1); // Initial number of lines
  const [newMessage, setNewMessage] = useState("");
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  const chatId = "chat1"; // For simplicity, we are using a hardcoded chatId
  const messageRef = ref(database, `messages/${chatId}/messages`);
  const [messages, setMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);
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
    },
    messageContainer: {
      backgroundColor: "#ffffff",
      borderRadius: 8,
      marginVertical: 5,
      marginHorizontal: 10,
      padding: 10,
      maxWidth: "70%",
    },

    timestamp: {
      fontSize: 15,
      color: "gray",
      marginTop: 5,
      alignSelf: "flex-end",
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
  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

  const renderSend = (props) => {
    return (
      <View
        style={{
          height: 44,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          paddingHorizontal: 14,
        }}
      >
        {
          <Send
            {...props}
            containerStyle={{
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="send-circle"
              size={32}
              color={theme.colors.primary}
            />
          </Send>
        }
      </View>
    );
  };
  const scrollToBottomComponent = () => {
    return <Icon source="down" color={theme.colors.primary} size={32} />;
  };
  const textInputRef = useRef(null);
  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#00000000",
          borderWidth: 0,
          borderTopWidth: 0,
        }}
        renderComposer={(props: ComposerProps) => renderComposer(props)}
      />
    );
  };
  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );
  const renderComposer = (props) => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#00000000",
          marginBottom: insets.bottom + 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            {...props}
            placeholder={"Type something..."}
            ref={(input) => {
              props.msgInput = input;
            }}
            onContentSizeChange={(event) => {
              const {
                nativeEvent: {
                  contentSize: { height },
                },
              } = event;
              const newNumLines = Math.floor(height / 20); // Assuming each line height is 20 units

              if (newNumLines !== numLines) {
                setNumLines(newNumLines);

                // Set border radius based on the number of lines
                setBorderRadius(newNumLines >= 2 ? 25 : 50); // For example, set radius to 25 if more than 3 lines, otherwise 50
              }
            }}
            onChangeText={(value) => {
              props.onTextChanged(value, props);
              setNewMessage(value);
            }}
            value={props.text}
            multiline={true}
            style={{
              minHeight: "80%",
              color: "#ffffff",
              backgroundColor: theme.colors.onBackground, // Set background color
              borderRadius: borderRadius,
              paddingHorizontal: 15, // Padding for text input
              fontSize: 16, // Font size
              lineHeight: 20, // Line height
            }}
          />
        </View>
        <Send
          {...props}
          containerStyle={{
            paddingRight: 10, // Padding for Send button
            paddingLeft: 5, // Padding for Send button
            height: "100%",
          }}
        >
          <MaterialCommunityIcons
            name="send-circle"
            size={60}
            color={theme.colors.primary}
          />
        </Send>
      </View>
    );
  };

  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Title" subtitle={"Subtitle"} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      <ImageBackground
        source={require("../assets/images/pattern.png")}
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          marginBottom: insets.bottom,
        }}
      >
        <GiftedChat
          messages={messages}
          renderSystemMessage={(props) => (
            <SystemMessage {...props} textStyle={{ color: Colors.gray }} />
          )}
          onInputTextChanged={setNewMessage}
          showAvatarForEveryMessage={true}
          maxComposerHeight={50}
          //showUserAvatar={true}
          // eslint-disable-next-line @typescript-eslint/no-shadow

          onLongPress={(context, message) => setReplyMessage(message)}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: "#000",
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: "#fff",
                  },
                  right: {
                    backgroundColor: Colors.lightGreen,
                  },
                }}
              />
            );
          }}
          onSend={(messages) => onSend(messages)}
          renderChatFooter={() => (
            <ReplyMessageBar
              clearReply={() => setReplyMessage(null)}
              message={replyMessage}
            />
          )}
          renderMessage={(props) => (
            <ChatMessageBox
              {...props}
              setReplyOnSwipeOpen={setReplyMessage}
              updateRowRef={updateRowRef}
            />
          )}
          user={{
            _id: user.id,
            name: user.fullName,
            avatar: user.profileImageUrl,
          }}
          alwaysShowSend
          renderInputToolbar={renderInputToolbar}
          scrollToBottomComponent={() => scrollToBottomComponent()}
          scrollToBottom
          listViewProps={{
            contentContainerStyle: {
              flexGrow: 1,
              justifyContent: "flex-end",
            },
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default withTheme(Meow);
