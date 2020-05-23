import { AlertService } from './../../services/alert.service';
import { GoalsService } from './../../services/goals.service';
import { SensorService } from './../../services/sensor.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Goal } from '../../models/goal.model';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  goalImg:  String = '../../../assets/images/bullseye.png';
  stepsData: any;
  weekProgressData: any[];
  user: any;
  userDefined: boolean = false;
  goalTypeSelected: boolean = false;
  goalType: string = ''; 

  date: any;

  goal: Goal = {
    activity: '',
    quantity: null,
    unit: 'passos',
    daysToEnd: null
  }

  myGoals: any = {
    activeGoals: [],
    inactiveGoals: []
  };

  constructor(private authService: AuthService, private userService: UserService,
              private sensorService: SensorService, private goalsService: GoalsService,
              private alertService: AlertService, private alertCtrl: AlertController,
              private dateService: DateService) { }

  ngOnInit() {
    this.getUser();
    this.getSensorData();
    this.getDate();
    this.getGoals();
    this.stepsData = 6500;
    this.weekProgressData = [1000, 2000, 400, 5000, 8000, 3000, 6500];
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
      this.myGoals = data;
      this.myGoals.activeGoals.forEach(element => {
        let dateStart = element.startDate.split('-');
        element.startDate = dateStart[2] + '/' + dateStart[1];
        let dateEnd = element.endDate.split('-');
        element.endDate = dateEnd[2] + '/' + dateEnd[1];
      });
      console.log(this.myGoals.activeGoals);
    })
  }

  confirmSetGoal() {
    const alert = this.alertCtrl.create({
      cssClass: 'signUpAlert',
      header: 'Deseja continuar?',
      message: 'Você confirma todos os seus dados?',
      buttons: [{
        text: 'Não',
        role: 'cancel',
        cssClass: 'signUpNoBtn'
      },
      {
        text: 'Sim',
        cssClass: 'signUpYesBtn',
        handler: () => {
          this.setGoal()
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  setGoal() {
    this.goalsService.setGoal(this.goal).then(data =>{
      this.goal = {
        activity: '',
        quantity: null,
        unit: 'passos',
        daysToEnd: null
      }
      this.goalType = '';
      this.goalTypeSelected = false;
      this.getGoals();
    })
  }

  setGoalType(type: string) {
    if (this.goalTypeSelected === false) {
      if (type === 'Caminhada') { this.goal.activity = 'Caminhada'; }
      this.goalType = type;
      this.goalTypeSelected = true;
    } else if (this.goalType === type){
      this.goalType = '';
      this.goal.activity = '';
      this.goalTypeSelected = false;
    }
  }

  getDate() {
    let  date = []
    date = this.dateService.getDate();

    this.date = date[0] +', ' + date[1] + ' de ' + date[2];
  }

}
