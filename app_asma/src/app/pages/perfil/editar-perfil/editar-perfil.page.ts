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
  user: any;
  userDefined: boolean = false;



  constructor(
              private userService: UserService,
              private AuthService: AuthService ) { }

  ngOnInit() { 
    this.userService.getUser().then(user => {
      this.user = user;
      this.userDefined = true;
      console.log(user);
    });
  }
 
}
