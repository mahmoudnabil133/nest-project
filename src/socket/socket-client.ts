import { OnModuleInit } from "@nestjs/common";
import { io, Socket } from "socket.io-client";


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