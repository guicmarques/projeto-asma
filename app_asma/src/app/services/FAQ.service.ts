import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { AlertService } from './alert.service';
import { NavController } from '@ionic/angular';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FAQService {
 
  constructor(private http: HttpClient,
              private env: EnvService,
              private alertService: AlertService,
              private authService: AuthService,
              private domSanitizer: DomSanitizer) { }



  getAllQuestions() {
    return new Promise ((resolve, reject) =>{
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.get(this.env.API_URL + 'faq/', { headers: header }).subscribe(data =>{
          resolve(data);
        }, (error) => {
          this.alertService.presentPopUp('Oops!', 'Não conseguimos carregar o FAQ. Tente novamente mais tarde.');
        });
      })
    }) 
  }



}
