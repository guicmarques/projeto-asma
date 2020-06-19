import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { EventService } from '../../../services/event.service';



@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})

export class EditarPerfilPage implements OnInit {
  user: any;
  nascimento: string;
  monthShortNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 
  'Outrubro', 'Novembro', 'Dezembro'];
  classChange = [false,false,false,false,false,false];
  dataSent: User;
  showhelp=[false,false,false,false];
  userDefined: boolean = false;
  newData: User = {
    nome: '',
    sobrenome: '',
    rg: null,
    username: null,
    peso: null,
    altura: null,
    email: '',
    telefone: null,
    imagem: '',
    token: '',
    tokenValidado: true,
    nascimento:'',
  }
  emptyData: User = {
    nome: '',
    sobrenome: '',
    rg: null,
    username: null,
    peso: null,
    altura: null,
    email: '',
    telefone: null,
    imagem: '',
    token: '',
    tokenValidado: true,
    nascimento:'',
  }



  constructor(
              private userService: UserService,
              private AuthService: AuthService,
              private alertCtrl: AlertController,
              private alertService: AlertService,
              private eventService: EventService
               ) { }

  ngOnInit() { 
    this.userService.getUser().then(user => {
      this.user = user;
      this.userDefined = true;
      console.log(user);
      this.dataSent = this.user;
      this.nascimento=  user.nascimento.substring(8,10) + ' ' + user.nascimento.substring(5,7) + ' ' + user.nascimento.substring(0,4);

    });
  }
  selectImg(){
    this.alertService.presentPopUp('Oops!', 'Função ainda não implementada.');


  }
  updateData(){
    if (this.newData.nome !==''){
      this.dataSent.nome = this.newData.nome;
    }
    if (this.newData.sobrenome !==''){
      this.dataSent.sobrenome = this.newData.sobrenome;
    }
    if (this.newData.peso !==null){
      this.dataSent.peso = this.newData.peso;
    }
    if (this.newData.altura !==null){
      this.dataSent.altura = this.newData.altura;
    }
    if (this.newData.telefone !==null){
      this.dataSent.telefone = this.newData.telefone;
    }
    if (this.newData.nascimento !==''){
      this.dataSent.nascimento = this.newData.nascimento.substring(0,10);
    }
  }

  confirmChanges() {
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
          this.saveChanges()
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }
  
  focus(focus, i){
    // Definido como i=0-> Nome, i=1 ->sobrenome, i=2-> peso, i=3->altura, i=4->telefone
    console.log(focus);
    this.classChange[i] = focus;
   
    
  
  }
  warning(show, i){
    this.showhelp[i]= show;

  }
  clearUser(user){
    user = {
      nome: '',
      sobrenome: '',
      rg: null,
      username: null,
      peso: null,
      altura: null,
      email: '',
      telefone: null,
      imagem: '',
      token: '',
      tokenValidado: true,
    }
  

  }

  saveChanges(){
    console.log(this.newData);
    this.updateData();
    console.log(this.dataSent);
    this.userService.putUser(this.dataSent);
    this.userService.getUser().then(user => {
      this.user = user;
      this.user = user;
      this.newData= this.emptyData;
      this.nascimento=   user.nascimento.substring(8,10) + ' ' + user.nascimento.substring(5,7) + ' ' + user.nascimento.substring(0,4);
      this.eventService.publish('userUpdated', {
        user: user,
      });
      
    });
    

  }
 
}

