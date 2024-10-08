// src/components/ChatInput.js
import React, { useState } from 'react';
import './ChatInput.css'; // Styling
import config  from '../../config';

const apiBaseUrl = config.API_BASE_URL;


const ChatInput = ({ addMessage,loadingFlag,deleteAllMessages }) => {
  const [userInput, setUserInput] = useState("");
    
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (userInput.trim()) {
//       addMessage({ content: userInput, role: "user" });
//       setUserInput("");

//       // Simulate bot response (you can replace this with API call later)
//       setTimeout(() => {
//         addMessage({ content: "This is a bot response!", role: "assistant" });
//       }, 1000);
//     }
//   };
      // Detect "Enter" key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Prevent the default action of the Enter key
      e.preventDefault();
      // Call handleSubmit to send the message
      handleSubmit(e);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInput.trim()) {
      // Add the user's message to the chat window
      addMessage({ text: userInput, sender: "user" });
      loadingFlag(true);
      // Prepare the body for the API call
      const requestBody = {
        user_id: "user_123",
        question: userInput,
      };

      try {
        addMessage({ content: userInput, role: "user" });
        
        // Make the API call to the server
        const response = await fetch(`${apiBaseUrl}/ask`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("API call failed");
        }

        
        
        // Parse the JSON response from the server
        const data = await response.json();
        
        setUserInput("");
        console.log(data)
        // Add the bot's response to the chat window
        addMessage({ content: data?.answer || "Sorry, I couldn't find any information.", role: "assistant" });
        loadingFlag(false);
      } catch (error) {
        // Handle errors and show a message in the chat window
        addMessage({ content: "Error: Unable to fetch response from server.", role: "assistant" });
      }

      // Clear the input field after sending the message
      setUserInput("");
    }
  };

  // Handle the deletion of all conversations
  const handleDeleteAll = () => {
    deleteAllMessages(); // This will call the delete function from the parent
  };


  return (
    <div className="chat-input-container">
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
     {/* Delete All button */}
     <button className="delete-button" onClick={handleDeleteAll}>
     Delete All
   </button>
   </div>
  );
};

export default ChatInput;
