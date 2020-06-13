import { Chat } from './../../../models/chat.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.page.html',
  styleUrls: ['./chat-bot.page.scss'],
})
export class ChatBotPage implements OnInit {
  @ViewChild('chat', { static: false }) div: ElementRef;

  newMsg: string = '';
  botAvatar: string = '../../../assets/images/chatbot_avatar.png';

  chats: any =[]

  constructor(private alertCtrl: AlertController, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().then(data => {
      let user: any = { data: []};
      user = data;
      let nome = user.nome;
      this.chats.push({
        id: '1',
        message: `Olá, ${nome}! Tudo bem com você? Me chamo AsmaBot! Sou um robô, mas posso tirar todas (ou quase) as 
                  suas dúvidas, então é só me perguntar!`,
        isMe: false,
        createdAt: new Date(),
        type: 'bot',
      },)
    })
  }

  sendMessage() {
    let question = this.setQuestion(this.newMsg);
    this.div.nativeElement.scrollTo(0, this.div.nativeElement.scrollHeight);
    this.newMsg = '';
    console.log(question);
  }

  setQuestion(message) {
    let question: Chat = {
      id: '1',
      message: message,
      isMe: true,
      createdAt: new Date().toString(),
      type: 'human'
    };

    this.chats.push(question);
    return question;
  }

  presentBot() {
    this.alertCtrl.create({
      cssClass: 'popUp',
      message: `<img src="${this.botAvatar}"> 
      <div style="paddin-top: 10px">Olá! Me chamo AsmaBot! Sou um robô, mas posso tirar todas (ou quase) as suas dúvidas, 
      então é só me perguntar!</div>`,
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
