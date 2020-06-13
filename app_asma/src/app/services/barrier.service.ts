import { EventService } from './event.service';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { EnvService } from './env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Barriers } from './../models/barriers.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarrierService {

  constructor(private http: HttpClient,
              private env: EnvService,
              private authService: AuthService,
              private alertService: AlertService,
              private eventService: EventService) { }

  setAnswers(answers: Barriers) {
    return new Promise ((resolve, reject) => {
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.post(this.env.API_URL + 'barriers/', {'interesse': answers.interesse, 
          'tempo': answers.tempo, 'energia': answers.energia, 'faltaAr': answers.faltaAr, 
          'companhia': answers.companhia, 'dinheiro': answers.dinheiro, 'coisas': answers.coisas, 
          'seguranca': answers.seguranca, 'clima': answers.clima, 'equipamentos': answers.equipamentos},
          {headers: header})
          .subscribe(data => {
            this.alertService.presentPopUp('Questionário de barreiras enviado!', 'Suas respostas foram registradas.');
            this.eventService.publish('barriersAnswered', false);
            resolve(data);
          }, (error) => {
            this.alertService.presentPopUp('Oops!', 'Houve um problema ao salvar suas respostas. Por favor, tente novamente.');
            reject(error);
          });
      });
    })
  }

  getLastBarriersDate() {
    return new Promise ((resolve, reject) => {
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.get(this.env.API_URL + 'barriers/', {headers: header}).subscribe(data => {
          console.log('Barreiras datas:', data)
          let dates = data['dates'];
          let lastDate = dates[dates.length - 1];
          console.log('Último questionário barreiras:', lastDate);
          resolve(lastDate);
        }, (error) => {
          console.log('Erro:', error);
          reject(error);
        });
      })
    })
  }
}
