import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = {
    nome: "Carol",
    sobrenome: 'marinilson',
    rg: '1234',
    cpf: 12345678900,
    peso: 58,
    altura: 1.64,
    email: 'cacs@cacs.com',
    telefone: 12345678,
    estaValidado: false
  }

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userService.register(this.user, 'cacs123', '123')
    .subscribe(data => {
      console.log(data);
    })
  }

}
