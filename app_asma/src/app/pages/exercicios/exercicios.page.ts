import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicios.page.html',
  styleUrls: ['./exercicios.page.scss'],
})

export class ExerciciosPage implements OnInit {
  @ViewChild('dot1', {static: false}) dot1: ElementRef;
  @ViewChild('dot2', {static: false}) dot2: ElementRef;
  @ViewChild('dot3', {static: false}) dot3: ElementRef;
  imgBuilding: String = '../../../assets/images/em_construcao.svg';
  dotA: Animation;
  dotB: Animation;
  dotC: Animation;

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dotA = this.animationCtrl.create()
      .addElement(this.dot1.nativeElement)
      .fill('none')
      .duration(2000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateY(0px)' },
        { offset: 0.125, transform: 'translateY(-5px)' },
        { offset: 0.25, transform: 'translateY(0px)' },
        { offset: 0.375, transform: 'translateY(0px)' },
        { offset: 0.5, transform: 'translateY(0px)' },
        { offset: 0.625, transform: 'translateY(0px)' },
        { offset: 0.75, transform: 'translateY(0px)' },
        { offset: 0.875, transform: 'translateY(0px)' },
        { offset: 1, transform: 'translateY(0px)' }
      ]);

      this.dotB = this.animationCtrl.create()
      .addElement(this.dot2.nativeElement)
      .fill('none')
      .duration(2000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateY(0px)' },
        { offset: 0.125, transform: 'translateY(0px)' },
        { offset: 0.25, transform: 'translateY(0px)' },
        { offset: 0.375, transform: 'translateY(-5px)' },
        { offset: 0.5, transform: 'translateY(0px)' },
        { offset: 0.625, transform: 'translateY(0px)' },
        { offset: 0.75, transform: 'translateY(0px)' },
        { offset: 0.875, transform: 'translateY(0px)' },
        { offset: 1, transform: 'translateY(0px)' }
      ]);

      this.dotC = this.animationCtrl.create()
      .addElement(this.dot3.nativeElement)
      .fill('none')
      .duration(2000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateY(0px)' },
        { offset: 0.125, transform: 'translateY(0px)' },
        { offset: 0.25, transform: 'translateY(0px)' },
        { offset: 0.375, transform: 'translateY(0px)' },
        { offset: 0.5, transform: 'translateY(0px)' },
        { offset: 0.625, transform: 'translateY(-5px)' },
        { offset: 0.75, transform: 'translateY(0px)' },
        { offset: 0.875, transform: 'translateY(0px)' },
        { offset: 1, transform: 'translateY(0px)' }
      ]);

    this.dotA.play();
    this.dotB.play();
    this.dotC.play();
  }

}
