import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barreiras',
  templateUrl: './barreiras.page.html',
  styleUrls: ['./barreiras.page.scss'],
})
export class BarreirasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}

/*
import { Questionnaire } from './../../../models/questionnaire.mode';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GestureController, Gesture } from '@ionic/angular';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.page.html',
  styleUrls: ['./questionario.page.scss'],
})
export class QuestionarioPage implements OnInit {
  @ViewChild('Q1', {static: false}) Q1: ElementRef;
  
  answers: Questionnaire = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null
  }

  constructor(private gestureCtrl: GestureController,
              private renderer: Renderer2) {}

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.Q1.nativeElement,
      gestureName: "card-swipe",
      threshold: 15,
      onStart: () => {
        console.log('Starting')
        this.renderer.setStyle(this.Q1.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev)
        this.renderer.setStyle(this.Q1.nativeElement, "transform", `translateX(${ev.deltaX}px)`);
      },
      onEnd: ev => {
        console.log("ending")
      }
    });
    gesture.enable();
  }

}
*/