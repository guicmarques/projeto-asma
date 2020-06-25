import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  constructor(private authService: AuthService, private storage: Storage,
              private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.storage.get('credenciais').then(async (data) => {
        if (data != null) {
          this.authService.login(data.username, data.password)
          .then(token => {
            console.log('Usuário logado');
            this.router.navigateByUrl('/tabs');
          })
          .catch((error) => {
            this.router.navigateByUrl('/login');
          })
        } else {
          this.router.navigateByUrl('/login');
        }
      })
    }, 2000); 
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.storage.get('credenciais').then(async (data) => {
        if (data != null) {
          this.authService.login(data.username, data.password)
          .then(token => {
            console.log('Usuário logado');
            this.router.navigateByUrl('/tabs');
          })
          .catch((error) => {
            this.router.navigateByUrl('/login');
          })
        } else {
          this.router.navigateByUrl('/login');
        }
      })
    }, 2000); 
  }

}
