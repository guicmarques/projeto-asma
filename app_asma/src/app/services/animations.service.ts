import { Injectable, ElementRef } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  icon: Animation;
  background: Animation;
  check: Animation;

  constructor(private animationCtrl: AnimationController) { }

  clickAnimation(saveIcon: ElementRef, loadingBack: ElementRef, checkIcon: ElementRef) {
    this.icon = this.animationCtrl.create()
      .addElement(saveIcon.nativeElement)
      .fill('none')
      .duration(5000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'rotate(0)' },
        { offset: 0.03, transform: 'rotate(9deg)' },
        { offset: 0.06, transform: 'rotate(27deg)' },
        { offset: 0.09, transform: 'rotate(72deg)' },
        { offset: 0.12, transform: 'rotate(126deg)' },
        { offset: 0.18, transform: 'rotate(270deg)' },
        { offset: 0.21, transform: 'rotate(306deg)' },
        { offset: 0.24, transform: 'rotate(342deg)' },
        { offset: 0.27, transform: 'rotate(370deg)' },
        //{ offset: 0.285, transform: 'rotate(370deg)' },
        //{ offset: 0.125, transform: 'rotate(180deg)' },
        //{ offset: 0.25, transform: 'rotate(370deg)' },
        { offset: 0.3, transform: 'rotate(360deg)' },
        { offset: 0.325, transform: 'translateY(0px)' },
        { offset: 0.35, transform: 'translateY(5px)' },
        { offset: 0.365, transform: 'translateY(1px)' },
        { offset: 0.38, transform: 'translateY(-7px)' },
        { offset: 0.395, transform: 'translateY(-15px)' },
        { offset: 0.425, transform: 'translateY(-25px)' },
        { offset: 0.5, transform: 'translateY(-50px)' },
        { offset: 1, transform: 'translateY(-50px)' }
      ]);

      this.background = this.animationCtrl.create()
      .addElement(loadingBack.nativeElement)
      .fill('none')
      .duration(5000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)', opacity: '1' },
        { offset: 0.1225, transform: 'translateX(25px)', opacity: '1' },
        { offset: 0.245, transform: 'translateX(50px)', opacity: '1' },
        { offset: 0.325, transform: 'translateX(50px)', opacity: '1'},
        { offset: 0.5, transform: 'translateX(50px)', opacity: '0' },
        { offset: 1, transform: 'translateX(50px)', opacity: '0' }
      ]);

      this.check = this.animationCtrl.create()
      .addElement(checkIcon.nativeElement)
      .fill('none')
      .duration(5000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateY(0px)', opacity: '1' },
        { offset: 0.35, transform: 'translateY(0px)', opacity: '1' },
        { offset: 0.425, transform: 'translateY(-25px)', opacity: '1' },
        { offset: 0.5, transform: 'translateY(-35px)', opacity: '1', easing: 'ease-out' },
        { offset: 0.6, transform: 'translateY(-35px)', opacity: '1' },
        { offset: 1, transform: 'translateY(-35px)', opacity: '0' }
      ]);
    
    this.icon.play();
    this.background.play();
    this.check.play();
  }

}
