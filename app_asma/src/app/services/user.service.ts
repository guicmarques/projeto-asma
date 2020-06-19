import { User } from './../models/user.model';
import { Records } from './../models/records.model';
import { Register } from './../models/register.model';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { AlertService } from './alert.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  record:any;
  constructor(private http: HttpClient,
              private env: EnvService,
              private alertService: AlertService,
              private navCtrl: NavController,
              private authService: AuthService) { }

  register(user: Register) {
    return this.http.post(this.env.API_URL + 'register/', 
    {'username': user.cpf.toString(), 'password': user.senha,'email': user.email, 'nome': user.nome, 'sobrenome': user.sobrenome, 'rg': user.rg, 
    'telefone': user.telefone, 'altura': user.altura, 'peso': user.peso, 'imagem': user.imagem,'token': user.tokenHC, 'nascimento': user.nascimento.substring(0,10)});   
  }
  putUser(user: User) {
    return new Promise ((resolve, reject) =>{
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.put(this.env.API_URL + 'user_data/', {
          'email': user.email, 'nome': user.nome, 'sobrenome': user.sobrenome,        
          'rg': user.rg, 'telefone': user.telefone, 'altura': user.altura,
          'peso': user.peso, 'imagem': user.imagem, 'token': user.token, 'nascimento': user.nascimento,
            }, { headers: header })
          .subscribe((data) => {
            this.alertService.presentPopUp('Alterações salvas!', 'Alterações salvas com sucesso.');
            resolve(data);
          }, (error) =>{
            this.alertService.presentPopUp('Erro!', 'Não foi possivel fazer as alterações.');
            reject(error);
          });
        });
      });
    
  }
  getUser( ) {
    return new Promise ((resolve, reject) =>{
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.get<User>(this.env.API_URL + 'user_data/', { headers: header }).subscribe(data =>{
          this.user = data;
          resolve(this.user);
        });
      })
    })      
  }
  getRecords(){
    return new Promise ((resolve, reject) =>{
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.get<Records>(this.env.API_URL + 'milestones/?info', { headers: header }).subscribe(data =>{
          this.record = data;
          resolve(this.record);
        });
      })
    })     

  }
  /*
  getMilestones(milestones: User) {
    return new Promise ((resolve, reject) =>{
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.get(this.env.API_URL + 'milestones/',{ find:true }, { headers: header})
          .subscribe((data) => {
            this.alertService.presentPopUp('Alterações salvas!', 'Alterações salvas com sucesso.');
            resolve(data);
          }, (error) =>{
            this.alertService.presentPopUp('Erro!', 'Não foi possivel fazer as alterações.');
            reject(error);
          });
        });
      });
    
  }*/
}
    

