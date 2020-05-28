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
  @ViewChild('firstLine', {static: false}) firstLine: ElementRef;
  @ViewChild('secondLine', {static: false}) secondLine: ElementRef;

  icon: Animation;
  background: Animation;
  check: Animation;
  line1: Animation;
  line2: Animation;

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {}

  ngAfterViewInit() {}

  clickAnimation() {
    this.icon = this.animationCtrl.create()
      .addElement(this.saveIcon.nativeElement)
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
        { offset: 0.425, transform: 'translateY(-25px)' },
        { offset: 0.5, transform: 'translateY(-50px)' },
        { offset: 1, transform: 'translateY(-50px)' }
      ]);

      this.background = this.animationCtrl.create()
      .addElement(this.loadingBack.nativeElement)
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
      .addElement(this.checkIcon.nativeElement)
      .fill('none')
      .duration(5000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'rotate(45deg)', opacity: '0' },
        { offset: 0.325, transform: 'rotate(45deg)', opacity: '0' },
        { offset: 0.33, transform: 'rotate(45deg)', opacity: '' },
        { offset: 0.425, transform: 'rotate(45deg)', opacity: '1' },
        { offset: 0.5, transform: 'rotate(45deg)', opacity: '1' },
        { offset: 0.6, transform: 'rotate(45deg)', opacity: '1' },
        { offset: 1, transform: 'rotate(45deg)', opacity: '0' }
      ]);

      this.line1 = this.animationCtrl.create()
      .addElement(this.firstLine.nativeElement)
      .fill('none')
      .duration(5000)
      .iterations(1)
      .keyframes([
        { offset: 0, background: '#FFB000', opacity: '0' },
        { offset: 0.345, background: '#FFB000', opacity: '0' },
        { offset: 0.35, background: '#FFB000', opacity: '1' },
        { offset: 0.355, background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,176,0,1) 10%, rgba(255,176,0,1) 100%)', opacity: '1' },
        { offset: 0.4, background: '#FFFFFF', opacity: '1' },
        { offset: 0.5, background: '#FFFFFF', opacity: '1' },
        { offset: 0.6, background: '#FFFFFF', opacity: '1' },
        { offset: 1, background: '#FFFFFF', opacity: '0' }
      ]);

      this.line2 = this.animationCtrl.create()
      .addElement(this.secondLine.nativeElement)
      .fill('none')
      .duration(5000)
      .iterations(1)
      .keyframes([
        { offset: 0, background: '#FFB000', opacity: '0' },
        { offset: 0.345, background: '#FFB000', opacity: '0' },
        { offset: 0.35, background: '#FFB000', opacity: '0' },
        { offset: 0.395, background: '#FFB000', opacity: '0' },
        { offset: 0.4, background: '#FFFFFF', opacity: '1' },
        { offset: 0.45, background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,176,0,1) 10%, rgba(255,176,0,1) 100%)', opacity: '1' },
        { offset: 0.5, background: '#FFFFFF', opacity: '1' },
        { offset: 0.6, background: '#FFFFFF', opacity: '1' },
        { offset: 1, background: '#FFFFFF', opacity: '0' }
      ]);
    
    this.icon.play();
    this.background.play();
    this.check.play();
  }
  
}
