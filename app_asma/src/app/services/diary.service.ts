import { AlertService } from './alert.service';
import { EnvService } from './env.service';
import { AuthService } from './auth.service';
import { Diary } from './../models/diary.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  diary: any;

  constructor(private http: HttpClient,
              private env: EnvService,
              private authService: AuthService,
              private alertService: AlertService) { }

  setDiaryPage(diaryPage: Diary) {
    return new Promise ((resolve, reject) => {
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.post(this.env.API_URL + 'daily/', {'note': diaryPage.note, 'pico': diaryPage.pico, 
                              'tosse': diaryPage.tosse, 'chiado': diaryPage.chiado, 'faltaAr': diaryPage.faltaAr,
                              'acordar': diaryPage.acordar, 'bombinha': diaryPage.bombinha}, {headers: header})
          .subscribe((data) => {
            resolve(data);
            setTimeout(() => {
              this.alertService.presentPopUp('Diário atualizado!', 'Suas respostas foram salvas com sucesso.')
            }, 2500)
          }, (error) => {
            this.alertService.presentPopUp('Oops!', 'Houve um problema ao salvar suas respostas. Por favor, tente novamente.')
            reject(error);
          });
      });
    })
  }

  getDiary() {
    return new Promise ((resolve, reject) => {
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.get(this.env.API_URL + 'daily/', {headers: header}).subscribe(data => {
          this.diary = data;
          resolve(this.diary);
        }, (error) => {
          console.log('Erro:', error);
          this.alertService.presentPopUp('Oops!', 'Houve um problema para obter seu diário de sintomas. Por favor, tente novamente.');
          reject(error);
        });
      })
    })
  }
}
