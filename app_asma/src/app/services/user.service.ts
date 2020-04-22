import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { AlertService } from './alert.service';
import { NavController } from '@ionic/angular';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;

  constructor(private http: HttpClient,
              private env: EnvService,
              private alertService: AlertService,
              private navCtrl: NavController,
              private authService: AuthService) { }

  register(user: User, senha: string, token: string) {
    return this.http.post(this.env.API_URL + 'register/', 
    {'username': user.cpf.toString(), 'password': senha,'email': user.email, 'nome': user.nome, 'sobrenome': user.sobrenome, 'rg': user.rg, 
    'telefone': user.telefone, 'altura': user.altura, 'peso': user.peso, 'token': token});   
  }

  getUser() {
    return new Promise ((resolve, reject) =>{
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.get(this.env.API_URL + 'user_data/', { headers: header }).subscribe(data =>{
          this.user = data;
          resolve(this.user);
        });
      })
    })      
  }

}
