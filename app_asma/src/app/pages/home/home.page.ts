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
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  goalImg:  String = '../../../assets/images/bullseye.png';
  stepsData: number = null;
  weekProgressData: any[];
  user: any;
  userDefined: boolean = false;
  goalTypeSelected: boolean = false;
  goalType: string = ''; 

  date: any;
  today: string;

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
              private dateService: DateService, private eventService: EventService) { }

  ngOnInit() {
    this.getUser();
    this.getDate()
    this.getGoals();

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
      this.eventService.publish('goalUpdated', {
        goal: data,
      });
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
    this.today = date[3] + '-' + date[4] + '-' + date[1];
  }

}
