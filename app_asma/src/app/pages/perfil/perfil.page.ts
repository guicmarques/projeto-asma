import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { AlertService } from './../../services/alert.service';
import { EventService } from './../../services/event.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {
  user:any;
 /* = {
    nome: "Bill",
    sobrenome: "Gates",
    rg: "010010101",
    username: 33333,
    peso: 55,
    altura: 1.75,
    email: "Bill.Gates@Gmail.com",
    telefone: 9393939,
    imagem: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Bill_Gates_2014.jpg",
    token: "token",
    tokenValidado: true,
  };*/
  userDefined: boolean = false;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 3,
    parallax:true,
    depth: 100,
    modifier: 1,
    slideShadows: true
  }; 


  constructor(private animationCtrl: AnimationController,
              private userService: UserService,
              private authService: AuthService,
              private alertService: AlertService,
              private eventService: EventService) { 
                this.eventService.subscribe('userUpdated', (data : any) =>{
                  this.user=data.user;
                  

                })
              }



ngOnInit() { 
  console.log(this.userDefined);
  this.userService.getUser().then(user => {
    this.user = user;
    this.userDefined = true;
    console.log(user);
  });
}
updateUser(){
  this.userService.getUser().then(user => {
    this.user = user;
    this.userDefined = true;
    console.log(user);
  });
  }
  openPopup(){
    this.alertService.presentPopUp('Oops!', 'Função ainda não impementada.');
  }
  logout() {
    this.authService.logout();
    console.log(this.authService.isLoggedIn);
    console.log(this.authService.credenciais);
  }
 
}
