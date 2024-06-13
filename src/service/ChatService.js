import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class ChatService {
    constructor() {
        this.client = new Client({
            brokerURL: 'ws://localhost:8080/notifications', // Adjust the URL according to your backend WebSocket endpoint
            connectHeaders: {},
            debug: (str) => {
                console.log(new Date(), str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            webSocketFactory: () => new SockJS('http://localhost:8080/notifications'), // Adjust the URL according to your backend SockJS endpoint
        });
    }

    connect(onMessageReceived) {
        this.client.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            this.client.subscribe('/user/queue/messages', (message) => {
                onMessageReceived(JSON.parse(message.body));
            });
        };

        this.client.activate();
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
        }
    }

    sendMessage(message) {
        if (this.client && this.client.connected) {
            this.client.publish({
                destination: '/app/chat',
                body: JSON.stringify(message),
            });
        }
    }
}

const chatService = new ChatService();
export default chatService;
