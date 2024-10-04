import { OnModuleInit } from "@nestjs/common";
import { io, Socket } from "socket.io-client";

// flow 
//1) SocketClient or postman sends meesage
//2) Gateway receives the message and emits it to all connected clients
//3) SocketClient or Postman listens to the event and logs the message
export class SocketClient implements OnModuleInit {
    public socketClient: Socket;

    constructor() {
        this.socketClient = io(`http://localhost:3000`);
    }
    onModuleInit() {
        this.regesterConsumerEvents();
    }
    private regesterConsumerEvents() {
        this.socketClient.emit('send-message', {message: 'Hello from client', sender: "mahmoud"});
        this.socketClient.on('connect', ()=>{
            console.log('connected to Gateway');
        });
        this.socketClient.on('receive-message', (payload: any)=>{
            console.log(`payload is : ${payload.message} from ${payload.sender}`) 
        })
    } 
}