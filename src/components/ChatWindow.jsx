// src/components/ChatWindow.js
import React, { useState,useEffect,useRef } from 'react';
import './ChatWindow.css'; // Styling
import ReactMarkdown from 'react-markdown';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
const ChatWindow = ({ messages,loadingFlag }) => {
    const bottomRef = useRef(null); // Ref to track the bottom of the chat

    useEffect(() => {
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages]);
    
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (  <>
        <div key={index} className={`message ${msg.role}`}>
          
          <ReactMarkdown>{msg.content}</ReactMarkdown>
           
          
        </div>
        {loadingFlag && msg.role == 'user' && index == messages.length - 1 && (
            <Box sx={{ width: 'auto' ,background:'white', borderRadius: '8px', padding:'10px', }}>
              <Skeleton    variant='rounded'sx={{ bgcolor: 'grey.400',margin:'10px' }}/>
              <Skeleton    variant='rounded'sx={{ bgcolor: 'grey.400',margin:'10px' }}/>
              <Skeleton    variant='rounded'sx={{ bgcolor: 'grey.400',margin:'10px' }}/>
              <Skeleton    variant='rounded'sx={{ bgcolor: 'grey.400',margin:'10px' }}/>
              <Skeleton    variant='rounded'sx={{ bgcolor: 'grey.400',margin:'10px' }}/>
              

            </Box>
          )}
          {/* This is an invisible div used to automatically scroll into view */}
      <div ref={bottomRef} />
        </>
        
      ))}
    </div>
  );
};

export default ChatWindow;
