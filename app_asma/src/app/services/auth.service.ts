import { AlertService } from './alert.service';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  token: any;
  credenciais: any;

  constructor(private http: HttpClient,
              private storage: Storage,
              private env: EnvService,
              private alertService: AlertService,
              private navCtrl: NavController) { }

  login(username: number, password: string) {
    return this.http.post(this.env.API_URL + 'token/', {'username': username, 'password': password})
    .subscribe(token => {
      this.token = token;
      this.isLoggedIn = true;
      console.log(this.token["refresh"]);
      this.storage.set('credenciais', {username: username, password: password}).then(() => {this.getCredenciais()});
      this.navCtrl.navigateRoot('/tabs/home');
    }, error => {
      console.log(error);
      this.alertService.presentPopUp('CPF ou senha inválidos');
    })
  }

  getCredenciais() {
    this.storage.get('credenciais').then(
      (data) => {
        console.log(data);
        this.credenciais = data;
      }
    );
  }

  validateToken() {
    return new Promise (resolve => {
      const header = new HttpHeaders({
        'Authorization': 'Bearer' + " " + this.token["access"]
      });
      return this.http.get(this.env.API_URL + 'hello/', { headers: header })
      .subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        console.log(error);
        return this.http.post(this.env.API_URL + 'token/refresh/', {refresh: this.token["refresh"]})
        .subscribe(token => {
          this.token["access"] = token["access"];
          console.log('Token de acesso:', this.token["access"]);
          console.log('Token de refresh:', this.token["refresh"]);
          resolve(token);
        }, error => {
          console.log(error);
          this.getNewRefreshToken().then(data => {
            resolve(data);
          })
        })
      })
    })   
  }
  
  getNewRefreshToken() {
    return new Promise ((resolve, reject) => {
      this.storage.get('credenciais').then(
        (data) => {
          console.log(data);
          this.credenciais = data;
          return this.http.post(this.env.API_URL + 'auth/token/', 
          {'username': this.credenciais.username, 'password': this.credenciais.password}).subscribe(token =>{
            console.log(token);
            this.token = token;
            resolve(token);
          }, error => {
            console.log(error);
            resolve(error);
          })
        }
      );
    })  
  }

  logout() {
    this.storage.remove('credendiais');
    this.isLoggedIn = false;
    this.credenciais = null;
    delete this.token;
  }

}
