import { Router } from '@angular/router';
import { BarrierService } from './../../../services/barrier.service';
import { Barriers } from './../../../models/barriers.model';
import { GestureController, Gesture, AlertController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-barreiras',
  templateUrl: './barreiras.page.html',
  styleUrls: ['./barreiras.page.scss'],
})
export class BarreirasPage implements OnInit {
  screenWidth = window.innerWidth;
  view = 0;
  @ViewChild('Q0', {static: false}) Q0: ElementRef;
  @ViewChild('Q1', {static: false}) Q1: ElementRef;
  @ViewChild('Q2', {static: false}) Q2: ElementRef;
  @ViewChild('Q3', {static: false}) Q3: ElementRef;
  @ViewChild('Q4', {static: false}) Q4: ElementRef;
  @ViewChild('Q5', {static: false}) Q5: ElementRef;
  @ViewChild('Q6', {static: false}) Q6: ElementRef;
  @ViewChild('Q7', {static: false}) Q7: ElementRef;
  @ViewChild('Q8', {static: false}) Q8: ElementRef;
  @ViewChild('Q9', {static: false}) Q9: ElementRef;
  @ViewChild('Q10', {static: false}) Q10: ElementRef;

  answers: Barriers =  {
    interesse: null,
    tempo: null,
    energia: null,
    faltaAr: null,
    companhia: null,
    dinheiro: null,
    coisas: null,
    seguranca: null,
    clima: null,
    equipamentos: null
}

  constructor(private gestureCtrl: GestureController,
              private renderer: Renderer2,
              private barrierService: BarrierService,
              private router: Router,
              private alertCtrl: AlertController) { }

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
      },
      onEnd: ev => {
        console.log("ending")

        this.renderer.setStyle(this.Q2.nativeElement, 'transition', '0.4s ease-out')

        if (ev.deltaX < -this.screenWidth/2.4) {
          this.renderer.setStyle(this.Q2.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
          this.view++;
          this.updateCardView();
        } else {
          this.renderer.setStyle(this.Q2.nativeElement, 'transform', 'translateX(0px)');
        }
      }
    });

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
          this.view++;
          this.updateCardView();
        } else {
          this.renderer.setStyle(this.Q3.nativeElement, 'transform', 'translateX(0px)');
        }
      }
    });

    const card4: Gesture = this.gestureCtrl.create({
      el: this.Q4.nativeElement,
      gestureName: "card-swipe",
      threshold: 15,
      onStart: () => {
        console.log('Starting')
        this.renderer.setStyle(this.Q4.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev)
        this.renderer.setStyle(this.Q4.nativeElement, "transform", `translateX(${ev.deltaX}px)`);
      },
      onEnd: ev => {
        console.log("ending")

        this.renderer.setStyle(this.Q4.nativeElement, 'transition', '0.4s ease-out')

        if (ev.deltaX < -this.screenWidth/2.4) {
          this.renderer.setStyle(this.Q4.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
          this.view++;
          this.updateCardView();
        } else {
          this.renderer.setStyle(this.Q4.nativeElement, 'transform', 'translateX(0px)');
        }  
      }
    });

    const card5: Gesture = this.gestureCtrl.create({
      el: this.Q5.nativeElement,
      gestureName: "card-swipe",
      threshold: 15,
      onStart: () => {
        console.log('Starting')
        this.renderer.setStyle(this.Q5.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev)
        this.renderer.setStyle(this.Q5.nativeElement, "transform", `translateX(${ev.deltaX}px)`);
      },
      onEnd: ev => {
        console.log("ending")

        this.renderer.setStyle(this.Q5.nativeElement, 'transition', '0.4s ease-out')

        if (ev.deltaX < -this.screenWidth/2.4) {
          this.renderer.setStyle(this.Q5.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
          this.view++;
          this.updateCardView();
        } else {
          this.renderer.setStyle(this.Q5.nativeElement, 'transform', 'translateX(0px)');
        }
      }
    });

    const card6: Gesture = this.gestureCtrl.create({
      el: this.Q6.nativeElement,
      gestureName: "card-swipe",
      threshold: 15,
      onStart: () => {
        console.log('Starting')
        this.renderer.setStyle(this.Q6.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev)
        this.renderer.setStyle(this.Q6.nativeElement, "transform", `translateX(${ev.deltaX}px)`);
      },
      onEnd: ev => {
        console.log("ending")

        this.renderer.setStyle(this.Q6.nativeElement, 'transition', '0.4s ease-out')

        if (ev.deltaX < -this.screenWidth/2.4) {
          this.renderer.setStyle(this.Q6.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
          this.view++;
          this.updateCardView();
        } else {
          this.renderer.setStyle(this.Q6.nativeElement, 'transform', 'translateX(0px)');
        }
      }
    });

    const card7: Gesture = this.gestureCtrl.create({
      el: this.Q7.nativeElement,
      gestureName: "card-swipe",
      threshold: 15,
      onStart: () => {
        console.log('Starting')
        this.renderer.setStyle(this.Q7.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev)
        this.renderer.setStyle(this.Q7.nativeElement, "transform", `translateX(${ev.deltaX}px)`);
      },
      onEnd: ev => {
        console.log("ending")

        this.renderer.setStyle(this.Q7.nativeElement, 'transition', '0.4s ease-out')

        if (ev.deltaX < -this.screenWidth/2.4) {
          this.renderer.setStyle(this.Q7.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
          this.view++;
          this.updateCardView();
        } else {
          this.renderer.setStyle(this.Q7.nativeElement, 'transform', 'translateX(0px)');
        }
      }
    });

    const card8: Gesture = this.gestureCtrl.create({
      el: this.Q8.nativeElement,
      gestureName: "card-swipe",
      threshold: 15,
      onStart: () => {
        console.log('Starting')
        this.renderer.setStyle(this.Q8.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev)
        this.renderer.setStyle(this.Q8.nativeElement, "transform", `translateX(${ev.deltaX}px)`);
      },
      onEnd: ev => {
        console.log("ending")

        this.renderer.setStyle(this.Q8.nativeElement, 'transition', '0.4s ease-out')

        if (ev.deltaX < -this.screenWidth/2.4) {
          this.renderer.setStyle(this.Q8.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
          this.view++;
          this.updateCardView();
        } else {
          this.renderer.setStyle(this.Q8.nativeElement, 'transform', 'translateX(0px)');
        }
      }
    });

    const card9: Gesture = this.gestureCtrl.create({
      el: this.Q9.nativeElement,
      gestureName: "card-swipe",
      threshold: 15,
      onStart: () => {
        console.log('Starting')
        this.renderer.setStyle(this.Q9.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev)
        this.renderer.setStyle(this.Q9.nativeElement, "transform", `translateX(${ev.deltaX}px)`);
      },
      onEnd: ev => {
        console.log("ending")

        this.renderer.setStyle(this.Q9.nativeElement, 'transition', '0.4s ease-out')

        if (ev.deltaX < -this.screenWidth/2.4) {
          this.renderer.setStyle(this.Q9.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
          this.view++;
          this.updateCardView();
        } else {
          this.renderer.setStyle(this.Q9.nativeElement, 'transform', 'translateX(0px)');
        }
      }
    });

    const card10: Gesture = this.gestureCtrl.create({
      el: this.Q10.nativeElement,
      gestureName: "card-swipe",
      threshold: 15,
      onStart: () => {
        console.log('Starting')
        this.renderer.setStyle(this.Q10.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev)
        this.renderer.setStyle(this.Q10.nativeElement, "transform", `translateX(${ev.deltaX}px)`);
      },
      onEnd: ev => {
        console.log("ending")

        this.renderer.setStyle(this.Q10.nativeElement, 'transition', '0.4s ease-out')
        this.renderer.setStyle(this.Q10.nativeElement, 'transform', 'translateX(0px)');
      }
    });

    card0.enable();
    card1.enable();
    card2.enable();
    card3.enable();
    card4.enable();
    card5.enable();
    card6.enable();
    card7.enable();
    card8.enable();
    card9.enable();
    card10.enable();

    //this.updateCardView()
  }

  ionViewDidEnter(){
    this.updateCardView()
  }

  ionViewDidLeave(){
    this.view = 0;
    //this.updateCardView()
  }

  updateCardView() {
    let current = this.view;

    for (let i = 0; i < 11 && current + i < 11; i++) {
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

        case 3:
          this.renderer.setStyle(this.Q3.nativeElement, 'transition', '0.4s ease-out');
          this.renderer.setStyle(this.Q3.nativeElement, 'transform', `translateY(${i*35}px) scale(${1 - 0.1*i})`);
          this.renderer.setStyle(this.Q3.nativeElement, 'opacity', `${1 - 0.2*i}`);
          this.renderer.setStyle(this.Q3.nativeElement, 'z-index', `${4 - i}`);
          break;
        
        case 4:
          this.renderer.setStyle(this.Q4.nativeElement, 'transition', '0.4s ease-out');
          this.renderer.setStyle(this.Q4.nativeElement, 'transform', `translateY(${i*35}px) scale(${1 - 0.1*i})`);
          this.renderer.setStyle(this.Q4.nativeElement, 'opacity', `${1 - 0.2*i}`);
          this.renderer.setStyle(this.Q4.nativeElement, 'z-index', `${4 - i}`);
          break;

        case 5:
          this.renderer.setStyle(this.Q5.nativeElement, 'transition', '0.4s ease-out');
          this.renderer.setStyle(this.Q5.nativeElement, 'transform', `translateY(${i*35}px) scale(${1 - 0.1*i})`);
          this.renderer.setStyle(this.Q5.nativeElement, 'opacity', `${1 - 0.2*i}`);
          this.renderer.setStyle(this.Q5.nativeElement, 'z-index', `${4 - i}`);
          break;

        case 6:
          this.renderer.setStyle(this.Q6.nativeElement, 'transition', '0.4s ease-out');
          this.renderer.setStyle(this.Q6.nativeElement, 'transform', `translateY(${i*35}px) scale(${1 - 0.1*i})`);
          this.renderer.setStyle(this.Q6.nativeElement, 'opacity', `${1 - 0.2*i}`);
          this.renderer.setStyle(this.Q6.nativeElement, 'z-index', `${4 - i}`);
          break;

        case 7:
          this.renderer.setStyle(this.Q7.nativeElement, 'transition', '0.4s ease-out');
          this.renderer.setStyle(this.Q7.nativeElement, 'transform', `translateY(${i*35}px) scale(${1 - 0.1*i})`);
          this.renderer.setStyle(this.Q7.nativeElement, 'opacity', `${1 - 0.2*i}`);
          this.renderer.setStyle(this.Q7.nativeElement, 'z-index', `${4 - i}`);
          break;

        case 8:
          this.renderer.setStyle(this.Q8.nativeElement, 'transition', '0.4s ease-out');
          this.renderer.setStyle(this.Q8.nativeElement, 'transform', `translateY(${i*35}px) scale(${1 - 0.1*i})`);
          this.renderer.setStyle(this.Q8.nativeElement, 'opacity', `${1 - 0.2*i}`);
          this.renderer.setStyle(this.Q8.nativeElement, 'z-index', `${4 - i}`);
          break;
        
        case 9:
          this.renderer.setStyle(this.Q9.nativeElement, 'transition', '0.4s ease-out');
          this.renderer.setStyle(this.Q9.nativeElement, 'transform', `translateY(${i*35}px) scale(${1 - 0.1*i})`);
          this.renderer.setStyle(this.Q9.nativeElement, 'opacity', `${1 - 0.2*i}`);
          this.renderer.setStyle(this.Q9.nativeElement, 'z-index', `${4 - i}`);
          break;

        case 10:
          this.renderer.setStyle(this.Q10.nativeElement, 'transition', '0.4s ease-out');
          this.renderer.setStyle(this.Q10.nativeElement, 'transform', `translateY(${i*35}px) scale(${1 - 0.1*i})`);
          this.renderer.setStyle(this.Q10.nativeElement, 'opacity', `${1 - 0.2*i}`);
          this.renderer.setStyle(this.Q10.nativeElement, 'z-index', `${4 - i}`);
          break;
      }
    }
  }

  prevCard(card: number) {
    switch(card - 1) {
      case 0:
        this.renderer.setStyle(this.Q0.nativeElement, 'transition', '1s ease-out');
        this.renderer.setStyle(this.Q0.nativeElement, 'transform', 'translateX(0px)');
        break;

      case 1:
        this.renderer.setStyle(this.Q1.nativeElement, 'transition', '1s ease-out');
        this.renderer.setStyle(this.Q1.nativeElement, 'transform', 'translateX(0px)');
        break;

      case 2:
        this.renderer.setStyle(this.Q2.nativeElement, 'transition', '1s ease-out');
        this.renderer.setStyle(this.Q2.nativeElement, 'transform', 'translateX(0px)');
        break;

      case 3:
        this.renderer.setStyle(this.Q3.nativeElement, 'transition', '1s ease-out');
        this.renderer.setStyle(this.Q3.nativeElement, 'transform', 'translateX(0px)');
        break;
      
      case 4:
        this.renderer.setStyle(this.Q4.nativeElement, 'transition', '1s ease-out');
        this.renderer.setStyle(this.Q4.nativeElement, 'transform', 'translateX(0px)');
        break;

      case 5:
        this.renderer.setStyle(this.Q5.nativeElement, 'transition', '1s ease-out');
        this.renderer.setStyle(this.Q5.nativeElement, 'transform', 'translateX(0px)');
        break;

      case 6:
        this.renderer.setStyle(this.Q6.nativeElement, 'transition', '1s ease-out');
        this.renderer.setStyle(this.Q6.nativeElement, 'transform', 'translateX(0px)');
        break;

      case 7:
        this.renderer.setStyle(this.Q7.nativeElement, 'transition', '1s ease-out');
        this.renderer.setStyle(this.Q7.nativeElement, 'transform', 'translateX(0px)');
        break;

      case 8:
        this.renderer.setStyle(this.Q8.nativeElement, 'transition', '1s ease-out');
        this.renderer.setStyle(this.Q8.nativeElement, 'transform', 'translateX(0px)');
        break;
      
      case 9:
        this.renderer.setStyle(this.Q9.nativeElement, 'transition', '1s ease-out');
        this.renderer.setStyle(this.Q9.nativeElement, 'transform', 'translateX(0px)');
        break;
    }

    this.view--;
    this.updateCardView();
  }

  nextCard(card: number) {
    switch(card) {
      case 0:
        this.renderer.setStyle(this.Q0.nativeElement, 'transition', '0.4s ease-out');
        this.renderer.setStyle(this.Q0.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
        break;

      case 1:
        this.renderer.setStyle(this.Q1.nativeElement, 'transition', '0.4s ease-out');
        this.renderer.setStyle(this.Q1.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
        break;

      case 2:
        this.renderer.setStyle(this.Q2.nativeElement, 'transition', '0.4s ease-out');
        this.renderer.setStyle(this.Q2.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
        break;

      case 3:
        this.renderer.setStyle(this.Q3.nativeElement, 'transition', '0.4s ease-out');
        this.renderer.setStyle(this.Q3.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
        break;
      
      case 4:
        this.renderer.setStyle(this.Q4.nativeElement, 'transition', '0.4s ease-out');
        this.renderer.setStyle(this.Q4.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
        break;

      case 5:
        this.renderer.setStyle(this.Q5.nativeElement, 'transition', '0.4s ease-out');
        this.renderer.setStyle(this.Q5.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
        break;

      case 6:
        this.renderer.setStyle(this.Q6.nativeElement, 'transition', '0.4s ease-out');
        this.renderer.setStyle(this.Q6.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
        break;

      case 7:
        this.renderer.setStyle(this.Q7.nativeElement, 'transition', '0.4s ease-out');
        this.renderer.setStyle(this.Q7.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
        break;

      case 8:
        this.renderer.setStyle(this.Q8.nativeElement, 'transition', '0.4s ease-out');
        this.renderer.setStyle(this.Q8.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
        break;
      
      case 9:
        this.renderer.setStyle(this.Q9.nativeElement, 'transition', '0.4s ease-out');
        this.renderer.setStyle(this.Q9.nativeElement, 'transform', `translateX(-${this.screenWidth}px)`);
        break;
    }

    this.view++;
    this.updateCardView();
  }

  confirmAnswers() {
    this.alertCtrl.create({
      cssClass: 'QAAlert',
      header: 'Deseja continuar?',
      message: 'Você confirma todas as suas respostas?',
      buttons: [{
        text: 'Não',
        role: 'cancel',
        cssClass: 'QANoBtn'
      },
      {
        text: 'Sim',
        cssClass: 'QAYesBtn',
        handler: () => {
          this.sendBarriers()
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  sendBarriers() {
    console.log('Barreiras:', this.answers);
    this.barrierService.setAnswers(this.answers).then(data => {
      this.router.navigateByUrl('tabs/diario')
    })
  }
}

