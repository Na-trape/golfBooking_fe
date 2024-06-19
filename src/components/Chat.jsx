import {useEffect, useRef, useState} from 'react';
import { Client } from '@stomp/stompjs';

const WS_URL = 'ws://localhost:8080/gs-guide-websocket'; // WebSocket server URL
const room = 'kekroom'; // WebSocket server URL

export const Chat = () => {
    const [messageHistory, setMessageHistory] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const username = localStorage.getItem('username'); // Retrieve username from localStorage

    const stompClient = useRef(new Client({
        brokerURL: WS_URL
    }));

    useEffect(() => {
        stompClient.current.onConnect = (frame) => {
            setConnected(true);
            console.log('Connected: ' + frame);
            stompClient.current.subscribe('/topic/chatroom', (message) => {
                console.log('message', message);
                setMessageHistory((prev) => [...prev, JSON.parse(message.body)]);
            });
        };

        stompClient.current.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };

        stompClient.current.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
    }, []);

    const handleClickConnect = () => {
        stompClient.current.activate();
    };

    const handleClickDisconnect = () => {
        stompClient.current.deactivate();
        setConnected(false);
        console.log("Disconnected");
    };

    const handleClickSendMessage = () => {
        if (inputMessage.trim() !== '') {
            const message = {
                from: username, // Use the retrieved username
                content: inputMessage,
            };
            stompClient.current.publish({
                destination: "/app/chat",
                body: JSON.stringify(message),
                room
            });
            setInputMessage('');
        }
    };

    return (
        <div>
            <button onClick={handleClickConnect} disabled={connected}>
                Connect to Chat
            </button>
            <button onClick={handleClickDisconnect} disabled={!connected}>
                Disconnect
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
                <button onClick={handleClickSendMessage} disabled={!connected}>
                    Send
                </button>
            </div>
        </div>
    );
};
