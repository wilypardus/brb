import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  constructor( public chatService:ChatService) {

    this.chatService.cargarMensajes().subscribe();

   }
mensaje:string="";
  ngOnInit(): void {
  }
enviarMensaje(){
  console.log(this.mensaje);
  if(this.mensaje.length===0){
    return;
  }

  this.chatService.agregarMensaje(this.mensaje)
  .then(()=>{console.log("mensaje enviado")})
    .catch((err)=>{console.log(err)})
}
}
