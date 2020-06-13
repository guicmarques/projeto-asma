import { Chat } from './../models/chat.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient,
              private env: EnvService,
              private alertService: AlertService,
              private authService: AuthService,) { }

  sendMessage(question: Chat) {
    console.log('teste');
  }
}
