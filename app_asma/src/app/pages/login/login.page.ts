import { AlertService } from './../../services/alert.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  username: number;
  password: string;

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(){
    //this.authService.login(12345678910, '123');
  }

  login() {
    if(this.username == null || this.username.toString().length !== 11) {
      this.alertService.presentToast('Por favor insira um CPF válido.');
    } else if(this.password === '') {
      this.alertService.presentToast('Por favor insira sua senha.');
    } else {
      this.authService.login(this.username, this.password);
    }
  }
}
