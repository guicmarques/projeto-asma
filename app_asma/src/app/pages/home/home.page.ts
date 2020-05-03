import { SensorService } from './../../services/sensor.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  stepsData: any; 

  constructor(private authService: AuthService, private userService: UserService,
              private sensorService: SensorService) { }

  ngOnInit() {
    this.stepsData = 6500;
   }

  logout() {
    this.authService.logout();
    console.log(this.authService.isLoggedIn);
    console.log(this.authService.credenciais);
  }

  getUser() {
    this.userService.getUser().then(user => {
      console.log(user);
    });
  }

  getSensorData() {
    this.sensorService.getSensorData('', '').then(data =>{
      console.log(data);
    })
  }

}
