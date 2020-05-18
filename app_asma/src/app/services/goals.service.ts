import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  goals: any;

  constructor(private http: HttpClient,
              private env: EnvService,
              private alertService: AlertService,
              private authService: AuthService,
              private userService: UserService) { }

  setGoal(goal: Goal) {
    return new Promise ((resolve, reject) =>{
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.post(this.env.API_URL + 'goals/', {'activity': goal.activity, 
                        'quantity': goal.quantity.toString(), 'daysToEnd': goal.daysToEnd.toString()}, { headers: header })
          .subscribe((data) => {
          this.alertService.presentPopUp('Meta definida!', 'Sua meta foi definida com sucesso.');
          resolve(data);
        }, (error) =>{
          this.alertService.presentPopUp('Oops!', 'Houve um problema com a definição da sua meta.');
          reject(error);
        });
      });
    })
  }

  getGoals() {
    return new Promise ((resolve, reject) =>{
      this.authService.validateToken().then(data => {
        const header = new HttpHeaders({
          'Authorization': 'Bearer' + " " + this.authService.token["access"]
        });
        return this.http.get(this.env.API_URL + 'goals/', { headers: header }).subscribe(data =>{
          this.goals = data;
          resolve(this.goals);
        }, (error) => {
          this.alertService.presentPopUp('Oops!', 'Houve um problema para obter suas metas.');
        });
      })
    })
  }

}
