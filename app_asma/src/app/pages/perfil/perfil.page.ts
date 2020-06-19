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
  records:  any = {
    steps:'0',
    weekly:'0',
    daily:'0',
  };

  milestones: Milestones[]= [];
  milestone: Milestones;
  imagemConquista: string;
  mensagem:string;
  
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
  this.alertService.presentLoading(4000);
  this.userService.getUser().then(user => {
    this.user = user;
    this.userDefined = true;
    console.log(user);
    
    
    
  })
  this.userService.getRecords().then(records =>{
      this.records = records;
      console.log(this.records);
      this.checkMilestones();
      console.log(this.milestones);
  }
    );
  
}
checkMilestones(){
    
    if(this.records.weekly>=2){
      if (this.records.weekly >=4){
        if (this.records.weekly >=8){
          this.milestones.push(
            { level: 3,
              quantity: null,
              nome: "Semanal",
              description:" Conquista atribuida por responder o Questionário de Controle de Asma (ACQ) por várias semanas seguidas. ",
              type:"semanas",
            })
        } else{
          this.milestones.push(
            { level: 2,
              quantity: 8-this.records.weekly,
              nome: "Semanal",
              description:" Conquista atribuida por responder o Questionário de Controle de Asma (ACQ) por várias semanas seguidas. ",
              type:"semanas",
            })
        }
      }
      else{
        this.milestones.push(
          { level: 1,
            quantity: 2-this.records.weekly,
            nome: "Semanal",
            description:" Conquista atribuida por responder o Questionário de Controle de Asma (ACQ) por várias semanas seguidas. ",
            type:"semanas",
          })
      }
    }
    else{
      this.milestones.push(
        { level: 0,
          quantity: 2-this.records.weekly,
          nome: "Semanal",
          description:" Conquista atribuida por responder o Questionário de Controle de Asma(ACQ) por várias semanas seguidas. ",
          type:"semanas",  
        })
    }
    
    if(this.records.daily>=7){
      if (this.records.daily >=15){
        if (this.records.daily >=31){
          this.milestones.push(
            { level: 3,
              quantity: null,
              nome: "Diário",
              description:" Conquista atribuída por conseguir responder o questionário diário por múltiplos dias seguidos. ",
              type:"dias",
            })
        } else{
          this.milestones.push(
            { level: 2,
              quantity: 31-this.records.daily,
              nome: "Diário",
              description:" Conquista atribuída por conseguir responder o questionário diário por múltiplos dias seguidos. ",
              type:"dias",
            })
        }
      }
      else{
        this.milestones.push(
          { level: 1,
            quantity: 15-this.records.daily,
            nome: "Diário",
            description:" Conquista atribuída por conseguir responder o questionário diário por múltiplos dias seguidos. ",
            type:"dias",
          })
      }
    }
    else{
      this.milestones.push(
        { level: 0,
          quantity: 7-this.records.daily,
          nome: "Diário",
          description:"  Conquista atribuída por conseguir responder o questionário diário por múltiplos dias seguidos. ",
          type:"dias",
        })}
    if(this.records.steps>=7){
      if (this.records.steps >=15){
        if (this.records.steps >=31){
          this.milestones.push(
            { level: 3,
              quantity: null,
              nome: "Meta Diária",
              description:" Conquista atribuída pelos dias consecutivos que voce conseguiu cumprir sua meta. ",
              type:"dias",
            })
        } else{
          this.milestones.push(
            { level: 2,
              quantity: 31-this.records.steps,
              nome: "Meta Diária",
              description:" Conquista atribuída pelos dias consecutivos que voce conseguiu cumprir sua meta. ",
              type:"dias",
            })
        }
      }
      else{
        this.milestones.push(
          { level: 1,
            quantity: 7-this.records.steps,
            nome: "Meta Diária",
            description:" Conquista atribuída pelos dias consecutivos que voce conseguiu cumprir sua meta.",
            type:"dias",
          })
      }
    }
    else{
      this.milestones.push(
        { level: 0,
          quantity: 7-this.records.steps,
          nome: "Meta Diária",
          description:"  Conquista atribuída pelos dias consecutivos que voce conseguiu cumprir sua meta. ",
          type:"dias",
        })}

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

  openPopup(milestone){
    var aviso : string;
    
    if(milestone.level == 2 ){
      this.imagemConquista='../../../assets/images/achievements/star_achievement_silver.png'

      aviso=` <br> Faltam `+ milestone.quantity+ " "  + milestone.type+ ` para a próxima medalha! <br>` }
    else if(milestone.level == 1){
      this.imagemConquista='../../../assets/images/achievements/star_achievement_bronze.png'

      aviso=` <br> Faltam `+ milestone.quantity+ " "  + milestone.type+ ` para a próxima medalha! <br>` }
    else if( milestone.level == 0){
      this.imagemConquista='../../../assets/images/achievements/star_achievement_notyet.png'

      aviso=` <br> Faltam `+ milestone.quantity+ " "  + milestone.type+ ` para a próxima medalha! <br>` }
    else{ aviso = ` <br> Parabéns você conseguiu todas as medalhas dessa categoria! <br>`
    this.imagemConquista='../../../assets/images/achievements/star_achievement_gold.png' }
    this.mensagem=` <img src="${this.imagemConquista}" width="50" height="50"> <br>`

    this.alertService.presentNoButtonPopUp(milestone.nome,this.mensagem+ milestone.description+ aviso);
  }
  logout() {
    this.authService.logout();
    console.log(this.authService.isLoggedIn);
    console.log(this.authService.credenciais);
  }
 
}

