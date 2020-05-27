import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';



@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})

export class EditarPerfilPage implements OnInit {
  user: any;
  classChange: boolean = false;
  dataSent: User;
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
  }



  constructor(
              private userService: UserService,
              private AuthService: AuthService,
              private alertCtrl: AlertController,
              private alertService: AlertService
               ) { }

  ngOnInit() { 
    this.userService.getUser().then(user => {
      this.user = user;
      this.userDefined = true;
      console.log(user);
      this.dataSent = this.user;
    });
  }
  selectImg(){
    this.alertService.presentPopUp('Oops!', 'Função ainda não impementada.');


  }
  updateData(){
    if (this.newData.nome !==''){
      this.dataSent.nome = this.newData.nome;
    }
    if (this.newData.sobrenome !==''){
      this.dataSent.sobrenome = this.newData.sobrenome;
    }
    if (this.newData.email !==''){
      this.dataSent.email = this.newData.email;
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
  changeClass(){
    
    this.classChange = true;
    console.log(this.classChange);
  
  }
  saveChanges(){
    console.log(this.newData);
    this.updateData();
    console.log(this.dataSent);
    this.userService.putUser(this.dataSent);
    this.userService.getUser().then(user => {
      this.user = user;
      console.log(user);
      this.newData = this.user;
    });
    

  }
 
}

