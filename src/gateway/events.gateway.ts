import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io"

@WebSocketGateway()
export class GateWay implements OnModuleInit {
  @WebSocketServer()
  server: Server
  
  onModuleInit() {
      this.server.on('connection', (socket)=>{
        console.log(`Client connected: ${socket.id}`)
      })
  }
  
  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() body: Message){
    // console.log(body)
    this.server.emit('receive-message', {
      message: body.message,
      sender: body.sender
    })
  }
}
interface Message {
  message: string;
  sender: string;
}