import { GestureController, Gesture } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-barreiras',
  templateUrl: './barreiras.page.html',
  styleUrls: ['./barreiras.page.scss'],
})
export class BarreirasPage implements OnInit {
  motives = [
    'Não tenho interesse.',
    'Falta de tempo.',
    'Sinto que não tenho energia ou disposição.',
    'Tenho medo de sentir falta de ar.',
    'Não tenho companhia ou incentivo de amigos/família.',
    'Não tenho dinheiro.',
    'Tenho muitas coisas para fazer.',
    'Não tenho um local seguro disponível.',
    'Por causa do clima (por exemplo: frio, calor, chuva).',
    'Não tenho equipamentos para praticar.'
  ];

  type = [
    'Fatores pessoais',
    'Fatores pessoais',
    'Fatores pessoais',
    'Fatores pessoais',
    'Fatores sociais',
    'Fatores sociais',
    'Fatores sociais',
    'Fatores ambientais',
    'Fatores ambientais',
    'Fatores ambientais'
  ];
  screenWidth = window.innerWidth;
  view = 0;
  @ViewChild('Q0', {static: false}) Q0: ElementRef;
  @ViewChild('Q1', {static: false}) Q1: ElementRef;
  @ViewChild('Q2', {static: false}) Q2: ElementRef;
  //@ViewChild('Q3', {static: false}) Q3: ElementRef;

  constructor(private gestureCtrl: GestureController,
              private renderer: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const card0: Gesture = this.gestureCtrl.create({
      el: this.Q0.nativeElement,
      gestureName: "card-swipe",
      threshold: 15,
      onStart: () => {
        console.log('Starting')
        this.renderer.setStyle(this.Q0.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev)
        this.renderer.setStyle(this.Q0.nativeElement, "transform", `translateX(${ev.deltaX}px)`);
      },
      onEnd: ev => {
        console.log("ending")

        this.renderer.setStyle(this.Q0.nativeElement, 'transition', '0.4s ease-out')

        if (ev.deltaX < -this.screenWidth/2.4) {
          this.renderer.setStyle(this.Q0.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
          this.view++;
          this.updateCardView();
        } else {
          this.renderer.setStyle(this.Q0.nativeElement, 'transform', 'translateX(0px)');
        }
        
      }
    });

    const card1: Gesture = this.gestureCtrl.create({
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

        this.renderer.setStyle(this.Q1.nativeElement, 'transition', '0.4s ease-out')

        if (ev.deltaX < -this.screenWidth/2.4) {
          this.renderer.setStyle(this.Q1.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
          this.view++;
          this.updateCardView();
        } else {
          this.renderer.setStyle(this.Q1.nativeElement, 'transform', 'translateX(0px)');
        }
        
      }
    });

    const card2: Gesture = this.gestureCtrl.create({
      el: this.Q2.nativeElement,
      gestureName: "card-swipe",
      threshold: 15,
      onStart: () => {
        console.log('Starting')
        this.renderer.setStyle(this.Q2.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev)
        this.renderer.setStyle(this.Q2.nativeElement, "transform", `translateX(${ev.deltaX}px)`);
        this.view++;
        this.updateCardView();
      },
      onEnd: ev => {
        console.log("ending")

        this.renderer.setStyle(this.Q2.nativeElement, 'transition', '0.4s ease-out')

        if (ev.deltaX < -this.screenWidth/2.4) {
          this.renderer.setStyle(this.Q2.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
        } else {
          this.renderer.setStyle(this.Q2.nativeElement, 'transform', 'translateX(0px)');
        }
        
      }
    });
/*
    const card3: Gesture = this.gestureCtrl.create({
      el: this.Q3.nativeElement,
      gestureName: "card-swipe",
      threshold: 15,
      onStart: () => {
        console.log('Starting')
        this.renderer.setStyle(this.Q3.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev)
        this.renderer.setStyle(this.Q3.nativeElement, "transform", `translateX(${ev.deltaX}px)`);
      },
      onEnd: ev => {
        console.log("ending")

        this.renderer.setStyle(this.Q3.nativeElement, 'transition', '0.4s ease-out')

        if (ev.deltaX < -this.screenWidth/2.4) {
          this.renderer.setStyle(this.Q3.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
        } else {
          this.renderer.setStyle(this.Q3.nativeElement, 'transform', 'translateX(0px)');
        }
        
      }
    });*/

    this.updateCardView()

    card0.enable();
    card1.enable();
    card2.enable();
    //card3.enable();
  }

  updateCardView() {
    let current = this.view;

    for (let i = 0; i < 3 && current + i < 3; i++) {
      switch(current + i) {
        case 0:
          this.renderer.setStyle(this.Q0.nativeElement, 'transition', '0.4s ease-out');
          this.renderer.setStyle(this.Q0.nativeElement, 'transform', `translateY(${i*35}px) scale(${1 - 0.1*i})`);
          this.renderer.setStyle(this.Q0.nativeElement, 'opacity', `${1 - 0.2*i}`);
          this.renderer.setStyle(this.Q0.nativeElement, 'z-index', `${4 - i}`);
          break;

        case 1:
          this.renderer.setStyle(this.Q1.nativeElement, 'transition', '0.4s ease-out');
          this.renderer.setStyle(this.Q1.nativeElement, 'transform', `translateY(${i*35}px) scale(${1 - 0.1*i})`);
          this.renderer.setStyle(this.Q1.nativeElement, 'opacity', `${1 - 0.2*i}`);
          this.renderer.setStyle(this.Q1.nativeElement, 'z-index', `${4 - i}`);
          break;

        case 2:
          this.renderer.setStyle(this.Q2.nativeElement, 'transition', '0.4s ease-out');
          this.renderer.setStyle(this.Q2.nativeElement, 'transform', `translateY(${i*35}px) scale(${1 - 0.1*i})`);
          this.renderer.setStyle(this.Q2.nativeElement, 'opacity', `${1 - 0.2*i}`);
          this.renderer.setStyle(this.Q2.nativeElement, 'z-index', `${4 - i}`);
          break;
      }
    }
  }

  prevCard() {

  }

  nextCard() {
    
  }
}

