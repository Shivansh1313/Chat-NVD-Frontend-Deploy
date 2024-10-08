// src/components/Chatbot.js
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import './Chatbot.css'; // Add some styles later
import  config  from '../../config';

const apiBaseUrl = config.API_BASE_URL;

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { content: "Hello! How can I help you today?", role: "assistant" },
  ]);
const [flag, setFlag] = useState(false);
  // const addMessage = (message) => {
  //   setMessages([...messages, message]);
  // };

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  const loadingFlag =(flag)=> {
    setFlag((prevFlag)=> flag);
  };
  const deleteAllMessages = async() => {
    try {
      setFlag(1);
      const response = await fetch(`${apiBaseUrl}/user_123`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessages([]);  // Clear messages if API call is successful
        setFlag(0);
      } else {
        console.error("Failed to delete messages");
      }
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
    
  };
  return (
    <div className="chatbot-container">
      <ChatWindow messages={messages} loadingFlag= {flag} />
      <ChatInput addMessage={addMessage} loadingFlag= {loadingFlag} deleteAllMessages={deleteAllMessages}/>
    </div>
  );
};

export default Chatbot;
