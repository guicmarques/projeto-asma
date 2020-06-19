import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { User } from './../../models/user.model';
import { Milestones } from './../../models/milestones.model';
import { Records } from './../../models/records.model';
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
  getConquistas: Milestones [];
  records:  Records={
    steps:10,
    weekly:8,
    daily:20,
  }

  milestones: Milestones[]= [];
  milestone: Milestones;
  

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
    this.checkMilestones();
    console.log(this.milestones);
  });
  
}
checkMilestones(){
    console.log(this.milestones);
    if(this.records.weekly>=2){
      if (this.records.weekly >=4){
        if (this.records.weekly >=8){
          this.milestones.push(
            { level: 3,
              quantity: null,
              nome: "Semanal",
            })
        } else{
          this.milestones.push(
            { level: 2,
              quantity: 8-this.records.weekly,
              nome: "Semanal",
            })
        }
      }
      else{
        this.milestones.push(
          { level: 1,
            quantity: 2-this.records.weekly,
            nome: "Semanal",
          })
      }
    }
    console.log(this.milestones);
    if(this.records.daily>=7){
      if (this.records.daily >=15){
        if (this.records.daily >=31){
          this.milestones.push(
            { level: 3,
              quantity: null,
              nome: "Diário",
            })
        } else{
          this.milestones.push(
            { level: 2,
              quantity: 31-this.records.daily,
              nome: "Diário",
            })
        }
      }
      else{
        this.milestones.push(
          { level: 1,
            quantity: 7-this.records.daily,
            nome: "Diário",
          })
      }
    }
    if(this.records.steps>=7){
      if (this.records.steps >=15){
        if (this.records.steps >=31){
          this.milestones.push(
            { level: 3,
              quantity: null,
              nome: "Meta Diária",
            })
        } else{
          this.milestones.push(
            { level: 2,
              quantity: 31-this.records.steps,
              nome: "Meta Diária",
            })
        }
      }
      else{
        this.milestones.push(
          { level: 1,
            quantity: 7-this.records.steps,
            nome: "Meta Diária",
          })
      }
    }

}
getMilestones(){
  this.milestones = this.getConquistas;
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
