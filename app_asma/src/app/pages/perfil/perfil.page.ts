import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  imgBuilding: String = '../../../assets/images/em_construcao.jpg';

  constructor() { }

  ngOnInit() {
  }

}
