import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  imgBuilding: String = '../../../assets/images/em_construcao.jpg';

  constructor() { }

  ngOnInit() {
  }

}
