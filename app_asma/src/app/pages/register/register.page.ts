import { AlertService } from './../../services/alert.service';
import { AlertController } from '@ionic/angular';
import { Register } from './../../models/register.model';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  senhaValida: boolean;
  senhaConf: string;
  hasTokenHC: boolean;
  profileImg: string = '';
  user: Register = {
    nome: '',
    sobrenome: '',
    rg: '',
    cpf: null,
    peso: null,
    altura: null,
    email: '',
    telefone: null,
    imagem: '',
    senha: '',
    tokenHC: ''
  }

  constructor(private authService: AuthService, 
              private userService: UserService,
              private alertService: AlertService,
              private alertCtrl: AlertController) { }

  ngOnInit() { }

  selectImg() {
    console.log("Funcionouuu");
  }

  initPwd() {
    console.log('oi');
    if (this.user.senha === '') {
      this.senhaValida = false;
    }
  }

  validatePwd() {
    if (this.user.senha.length === this.user.senha.replace(/\s/g, '').length && this.user.senha.length >= 8) {
      this.senhaValida = true;
    } else {
      this.senhaValida = false;
    }
  }

  confirmSignUp() {
    this.alertCtrl.create({
      header: 'Deseja continuar?',
      message: 'Você confirma todos os seus dados?',
      buttons: [{
        text: 'Não',
        role: 'cancel'
      },
      {
        text: 'Sim',
        handler: () => {
          this.signUp()
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  signUp() {
    this.userService.register(this.user).subscribe(response => {
      if(response["created"]) {
        this.authService.login(this.user.cpf, this.user.senha);
      } else {
        this.alertService.presentPopUp('Usuário já cadastrado');
      }    
    })   
  }

}