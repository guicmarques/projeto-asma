import { ChatbotService } from './../../../services/chatbot.service';
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

  constructor(private alertCtrl: AlertController, private userService: UserService,
              private chatService: ChatbotService) { }

  ngOnInit() {
    this.userService.getUser().then(data => {
      let user: any = { data: []};
      user = data;
      let nome = user.nome;
      this.chats.push({
        message: `Olá, ${nome}! Tudo bem com você? Me chamo AsmaBot! Sou um robô, mas posso tirar todas (ou quase) as 
                  suas dúvidas, então é só me perguntar!`,
        isMe: false,
        createdAt: new Date(),
        type: 'bot',
      },)
    })
  }

  sendMessage() {
    this.setQuestion(this.newMsg).then(async message => {
      this.chatService.sendMessage(this.chats[this.chats.length - 1].message).then(data => {
        setTimeout(() => {this.div.nativeElement.scrollTo(0, this.div.nativeElement.scrollHeight)}, 10);
        this.chats[this.chats.length - 1].sent = true;
        let payload: any = {
          intent: '',
          responses: [],
        }
        payload = data;
        for (let i = 0; i < payload.responses.length; i++) {
          let answer: Chat = {
            message: payload.responses[i],
            isMe: false,
            createdAt: new Date().toString(),
            type: 'bot'
          }
          this.chats.push(answer);
          setTimeout(() => {this.div.nativeElement.scrollTo(0, this.div.nativeElement.scrollHeight)}, 10);
        }
      })
    })
  }

  setQuestion(message) {
    return new Promise ((resolve) => {
      let question = {
        message: message,
        isMe: true,
        createdAt: new Date().toString(),
        type: 'human',
        sent: false
      };

      this.newMsg = '';
  
      this.chats.push(question);
      setTimeout(() => {this.div.nativeElement.scrollTo(0, this.div.nativeElement.scrollHeight)}, 10);
      resolve(question.message);
    });
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
