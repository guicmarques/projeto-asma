import { AlertService } from './alert.service';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';
import { NavController } from '@ionic/angular';

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
      this.storage.set('credenciais', {username: username, password: password});
      this.getCredenciais();
      this.navCtrl.navigateRoot('/tabs/home');
    }, error => {
      console.log(error);
      this.alertService.presentPopUp('CPF ou senha inválidos');
    })
  }

  register(user: User, senha: string, token: string) {
    return this.http.post(this.env.API_URL + 'register/', 
    {nome: user.nome, rg: user.rg, cpf: user.cpf, peso: user.peso, altura: user.altura, email: user.email,
    telefone: user.telefone, senha: senha, token: token});
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
    const header = new HttpHeaders({
      'Authorization': 'Bearer' + " " + this.token["access"]
    });
    return this.http.post(this.env.API_URL + 'hello/', {teste: 'Teste de validacao dos Tokens'},{ headers: header })
    .subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      return this.http.post(this.env.API_URL + 'token/refresh/', {refresh: this.token["refresh"]})
      .subscribe(token => {
        this.token["access"] = token["access"];
        console.log('Token de acesso:', this.token["access"]);
        console.log('Token de refresh:', this.token["refresh"]);
      }, error => {
        console.log(error);
        this.getNewRefreshToken();
      })
    })
  }
  
  getNewRefreshToken() {
    this.storage.get('credenciais').then(
      (data) => {
        console.log(data);
        this.credenciais = data;
        return this.http.post(this.env.API_URL + 'auth/token/', 
        {'username': this.credenciais.username, 'password': this.credenciais.password}).subscribe(token =>{
          console.log(token);
          this.token = token;
        }, error => {
          console.log(error);
        })
      }
    );
  }

  logout() {
    this.storage.remove('credendiais');
    this.isLoggedIn = false;
    delete this.token;
  }

}
