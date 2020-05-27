import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})

export class EditarPerfilPage implements OnInit {
  user: any;
  newData: User;
  userDefined: boolean = false;
  temp: User = {
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
              private AuthService: AuthService ) { }

  ngOnInit() { 
    this.userService.getUser().then(user => {
      this.user = user;
      this.userDefined = true;
      console.log(user);
      this.newData = this.user;
    });
  }
  
  saveChanges(){
    console.log(this.newData);
    this.userService.putUser(this.newData);
    // pra checar
    this.userService.getUser().then(user => {
      this.user = user;
      console.log(user);
      this.newData = this.user;
    });
    

  }
 
}
