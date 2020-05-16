import { GoalsService } from './../../services/goals.service';
import { SensorService } from './../../services/sensor.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Goal } from '../../models/goal.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  goalImg:  String = '../../../assets/images/bullseye.png';
  stepsData: any;
  user: any;
  userDefined: boolean = false; 

  date: any;

  goal: Goal = {
    activity: "Passos",
    quantity: '8000',
    daysToEnd: '30'
  }

  constructor(private authService: AuthService, private userService: UserService,
              private sensorService: SensorService, private goalsService: GoalsService) { }

  ngOnInit() {
    this.getUser();
    this.getSensorData();
    this.getDate();
    this.setGoal();
    this.stepsData = 6500;
   }

  logout() {
    this.authService.logout();
    console.log(this.authService.isLoggedIn);
    console.log(this.authService.credenciais);
  }

  getUser() {
    this.userService.getUser().then(user => {
      this.user = user;
      this.userDefined = true;
      console.log(user);
    });
  }

  getSensorData() {
    this.sensorService.getSensorData('', '').then(data =>{
      console.log(data);
    })
  }

  getGoals() {
    this.goalsService.getGoals().then(data => {
      console.log('Minhas metas:', data);
    })
  }

  setGoal() {
    this.goalsService.setGoal(this.goal);
  }

  getDate() {
    let date = new Date();
    let dateString = date.toDateString();
    let fullDate = dateString.split(' ');
    let diaSemana = fullDate[0];
    let dia = fullDate[2];
    let mesNumber = fullDate[1];

    let meses = {'January': 'Janeiro', 'February': 'Fevereiro', 'March': 'Março', 'April': 'Abril', 'May': 'Maio', 
                'June':'Junho', 'July': 'Julho', 'August': 'Agosto', 'September': 'Setembro', 'October': 'Outubro', 
                'November': 'Novembro', 'December': 'Dezembro'};

    let diasSemana = {'Mon': 'Segunda-feira', 'Tue': 'Terça-feira', 'Wed': 'Quarta-feira', 'Thu': 'Quinta-feira',
                      'Fri': 'Sexta-feira', 'Sat': 'Sábado', 'Sun': 'Domingo'}

    let mes = meses[mesNumber];

    this.date = diasSemana[diaSemana] +', ' + dia + ' de ' + mes
  }

}
