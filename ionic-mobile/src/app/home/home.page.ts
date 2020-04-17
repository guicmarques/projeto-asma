import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  height: number;
  weight: number;  
  imc: string;

  constructor() {}

  clear() {
    this.height = null;
    this.weight = null;
    this.imc = '';
  }

  calculateIMC() {
    this.imc = (this.weight/this.height**2).toPrecision(5);
  }

}
