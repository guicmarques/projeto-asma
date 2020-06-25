import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  sendMessage(question: string) {
    return new Promise ((resolve, reject) =>{
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.post(this.env.API_URL + 'watson/', {'text': question}, { headers: header })
          .subscribe((data) => {
          resolve(data);
        }, (error) =>{
          this.alertService.presentPopUp('Oops!', 'Parece que temos um problema com a conexão! Tente novamente mais tarde.');
          reject(error);
        });
      });
    })
  }
}
