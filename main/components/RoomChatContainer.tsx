import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import io, { Socket } from 'socket.io-client';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
interface Message {
  user: string;
  uid: number;
  message: string;
}

const SOCKET_SERVER_URL = 'http://localhost:8000';

export default function RoomChatContainer({ room, user }: any) {
  const [socket, setSocket] = useState<Socket | null>(null); // Define the socket type
  const [messages, setMessages] = useState<Message[]>([]); // State to store chat messages
  const [inputMessage, setInputMessage] = useState<string>(''); // State for input message

  useEffect(() => {
    if (!room) {
      return;
    }
    // Create and connect the socket when the component mounts
    const socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
    });

    // Set up event listeners
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.emit('joinRoom', { uuid: room.uuid, user: user.name, uid: user.uid });

    socket.on('joinedRoom', (data: {user: string, uid: number}) => {
      toast.success(`User ${data.user} joined the room`);
      // Add the user to the user list
    })

    // Listen for messages from the server
    socket.on('message', (message: Message) => {
      console.log('Received message', message);
      if (message.uid !== user.uid) {
        setMessages((prevMessages: any) => [...prevMessages, message]);
      }
    });

    // Save the socket connection in state
    setSocket(socket);

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, [room]);

  // Function to send a message to the server
  const sendMessage = (e: any) => {
    console.log('Sending message', inputMessage);
    if (socket && inputMessage.trim()) {
      const message = { uuid: room.uuid, user: user.name, uid: user.id, message: inputMessage };
      socket.emit('message', message); // Send the message to the server
      // setMessages((prevMessages: any) => [...prevMessages, message]); // Add the message to the local state
      setInputMessage(''); // Clear the input field
    }
  };

  return (
    <div style={{ position: "relative", height: 600}}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((item, index) => (<Message
              key={index}
              model={{
                message: item.message,
                sender: item.user,
                direction: item.uid === user.uid ? "outgoing" : "incoming",
                position: "normal",
              }}
            />))}
          </MessageList>
          <MessageInput placeholder="Type message here" onChange={(html, text) => setInputMessage(text)} onSend={sendMessage}/>
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
