import { EventService } from './event.service';
import { Subject, Observable } from 'rxjs';
import { Questionnaire } from './../models/questionnaire.mode';
import { EnvService } from './env.service';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  constructor(private http: HttpClient,
              private env: EnvService,
              private authService: AuthService,
              private alertService: AlertService,
              private eventService: EventService) { }

  setAnswers(answers: Questionnaire) {
    return new Promise ((resolve, reject) => {
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.post(this.env.API_URL + 'questionnaire/', {'1': answers[1], '2': answers[2], '3': answers[3],
                              '4': answers[4], '5': answers[5], '6': answers[6], '7': answers[7]}, {headers: header})
          .subscribe(data => {
            this.alertService.presentPopUp('Questionário enviado!', 'Suas respostas foram registradas.');
            this.eventService.publish('ACQAnswered', false);
            resolve(data);
          }, (error) => {
            this.alertService.presentPopUp('Oops!', 'Houve um problema ao salvar suas respostas. Por favor, tente novamente.');
            reject(error);
          });
      });
    })
  }

  getLastQuestionnaireDate() {
    return new Promise ((resolve, reject) => {
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.get(this.env.API_URL + 'questionnaire/', {headers: header}).subscribe(data => {
          console.log('ACQ datas:', data)
          let dates = data['dates'];
          let lastDate = dates[dates.length - 1];
          console.log('Último questionário:', lastDate);
          resolve(lastDate);
        }, (error) => {
          console.log('Erro:', error);
          reject(error);
        });
      })
    })
  }
}
