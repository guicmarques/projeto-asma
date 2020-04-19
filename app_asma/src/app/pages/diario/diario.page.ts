import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.page.html',
  styleUrls: ['./diario.page.scss'],
})
export class DiarioPage implements OnInit {
  imgBuilding: String = '../../../assets/images/em_construcao.svg';

  constructor() { }

  ngOnInit() {
  }

}
