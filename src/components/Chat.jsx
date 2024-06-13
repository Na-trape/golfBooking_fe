import React, { useState, useEffect, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const WS_URL = 'ws://localhost:8080/ws'; // WebSocket server URL

export const Chat = () => {
    const [messageHistory, setMessageHistory] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const username = localStorage.getItem('username'); // Retrieve username from localStorage

    const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established');
        },
        onClose: (event) => {
            console.log('WebSocket connection closed:', event);
        },
        onError: (event) => {
            console.error('WebSocket error:', event);
        },
        shouldReconnect: (closeEvent) => true,
        share: true,
    });

    console.log('lastMessage', lastMessage);

    useEffect(() => {
        if (lastMessage !== null) {
            console.log('Received message:', lastMessage);
            const message = JSON.parse(lastMessage.data);
            setMessageHistory((prev) => [...prev, message]);
        }
    }, [lastMessage]);

    const handleClickConnect = useCallback(() => {
        sendMessage(JSON.stringify({
            command: 'SUBSCRIBE',
            destination: '/topic/chatroom'
        }));
    }, [sendMessage]);

    const handleClickSendMessage = useCallback(() => {
        if (inputMessage.trim() !== '') {
            const message = {
                from: username, // Use the retrieved username
                content: inputMessage,
            };
            sendMessage(JSON.stringify(message)); // Send the message directly
            setInputMessage('');
        }
    }, [inputMessage, sendMessage, username]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <div>
            <button onClick={handleClickConnect} disabled={readyState !== ReadyState.OPEN}>
                Connect to Chat
            </button>
            <div>
                <h2>Chat Room</h2>
                <div style={{ border: '1px solid black', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                    {messageHistory.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.from}:</strong> {msg.content}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
                    Send
                </button>
            </div>
            <span>The WebSocket is currently {connectionStatus}</span>
        </div>
    );
};

