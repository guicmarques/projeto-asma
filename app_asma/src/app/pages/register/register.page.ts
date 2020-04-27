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
  profileImg: string = '';
  user: Register = {
    nome: "Cascçon",
    sobrenome: 'Marinilson',
    rg: '12345678',
    cpf: 12345678944,
    peso: 58,
    altura: 164,
    email: 'cacs@cacs.com',
    telefone: 12345678,
    imagem: '',
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

  selectImg() {
    console.log("Funcionouuu");
  }

}
