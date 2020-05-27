import { Animation, AnimationController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss'],
})
export class SaveButtonComponent implements OnInit {
  @ViewChild('saveIcon', {static: false}) saveIcon: ElementRef;
  @ViewChild('loadingBack', {static: false}) loadingBack: ElementRef;
  @ViewChild('checkIcon', {static: false}) checkIcon: ElementRef;

  icon: Animation;
  background: Animation;
  check: Animation;

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {}

  ngAfterViewInit() {}

  clickAnimation() {
    this.icon = this.animationCtrl.create()
      .addElement(this.saveIcon.nativeElement)
      .fill('none')
      .duration(6000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'rotate(0)' },
        { offset: 0.125, transform: 'rotate(180deg)' },
        { offset: 0.25, transform: 'rotate(370deg)' },
        { offset: 0.3, transform: 'rotate(360deg)' },
        { offset: 0.325, transform: 'translateY(0px)' },
        { offset: 0.35, transform: 'translateY(5px)' },
        { offset: 0.425, transform: 'translateY(-25px)' },
        { offset: 0.5, transform: 'translateY(-50px)' },
        { offset: 1, transform: 'translateY(-50px)' }
      ]);

      this.background = this.animationCtrl.create()
      .addElement(this.loadingBack.nativeElement)
      .fill('none')
      .duration(6000)
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
      .addElement(this.checkIcon.nativeElement)
      .fill('none')
      .duration(6000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateY(0px)', opacity: '1' },
        { offset: 0.35, transform: 'translateY(0px)', opacity: '1' },
        { offset: 0.425, transform: 'translateY(-25px)', opacity: '1' },
        { offset: 0.5, transform: 'translateY(-35px)', opacity: '1' },
        { offset: 0.6, transform: 'translateY(-35px)', opacity: '1' },
        { offset: 1, transform: 'translateY(-35px)', opacity: '0' }
      ]);
    
    this.icon.play();
    this.background.play();
    this.check.play();
  }
  
}
