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
    nome: 'cacs',
    rg: 'cacs',
    cpf: 123,
    peso: 58,
    altura: 1.64,
    email: 'cacs@cacs.com',
    telefone: 12345678,
    estaValidado: false
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.register(this.user, 'cacs123', '123');
  }

}
