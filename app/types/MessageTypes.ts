// MessageTypes.ts

// Define the type for a single message
export type Message = {
  senderId: string;
  text: string;
  timestamp: number;
};

// Define the type for an array of messages
export type MessageArray = Message[];

// Define the type for a chat room
export type ChatRoom = {
  chatId: string;
  messages: MessageArray;
};
