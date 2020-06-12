import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})

export class FaqPage implements OnInit {
  expandQuestions: boolean[] = [false,false,false,false];

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
  };
  expand(questionNumber){
   
    this.expandQuestions[questionNumber] = !(this.expandQuestions[questionNumber]);
  }

}
