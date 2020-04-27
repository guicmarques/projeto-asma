import { ImageService } from './../../services/image.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit { 
  @ViewChild('dot1', {static: false}) dot1: ElementRef;
  @ViewChild('dot2', {static: false}) dot2: ElementRef;
  @ViewChild('dot3', {static: false}) dot3: ElementRef;
  imgBuilding: String = '../../../assets/images/em_construcao.svg';
  dotA: Animation;
  dotB: Animation;
  dotC: Animation;

  constructor(private animationCtrl: AnimationController, private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() { }

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

  logout() {
    this.authService.logout();
    console.log(this.authService.isLoggedIn);
    console.log(this.authService.credenciais);
  }

  getUser() {
    this.userService.getUser().then(user => {
      console.log(user);
    });
  }

}
