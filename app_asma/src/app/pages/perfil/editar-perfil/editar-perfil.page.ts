import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./../perfil.page.scss'],
})

export class EditarPerfilPage implements OnInit {
  user: User = {
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
  };
  


  constructor(private animationCtrl: AnimationController,
              private UserService: UserService,
              private AuthService: AuthService ) { }

  ngOnInit() { 
   //this.UserService.getUser().then((result) => { this.user = result;});
  }
 
}
