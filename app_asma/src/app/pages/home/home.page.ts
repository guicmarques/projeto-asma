import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit { 
  imgBuilding: String = '../../../assets/images/em_construcao.jpg';

  constructor() { }

  ngOnInit() {
  }

}
