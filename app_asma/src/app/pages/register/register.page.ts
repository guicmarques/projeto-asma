import { Register } from './../../models/register.model';
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
  senhaConf: string;
  hasTokenHC: boolean;
  user: Register = {
    nome: "Cascçon",
    sobrenome: 'Marinilson',
    rg: '12345678',
    cpf: 12345678922,
    peso: 58,
    altura: 1.64,
    email: 'cacs@cacs.com',
    telefone: 12345678,
    imagem: 'data:image/jpeg;base64,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',
    senha: 'marley',
    tokenHC: 'cacsamapeps'
  }

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userService.register(this.user)
    .subscribe(data => {
      console.log(data);
    })
  }

}
