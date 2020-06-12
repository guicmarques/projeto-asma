import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.page.html',
  styleUrls: ['./chat-bot.page.scss'],
})
export class ChatBotPage implements OnInit {
  chats: any =[
    {
      id: '1',
      message: 'Olá cacs!',
      isMe: false,
      createdAt: new Date(),
      type: 'bot',
    },
    {
      id: '2',
      message: 'Olá! Tenho uma pergunta para você!',
      isMe: true,
      createdAt: new Date(),
      type: 'human',
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
