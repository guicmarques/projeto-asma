import { Injectable } from '@angular/core';
import { ToastController, AlertController, PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastController: ToastController, 
              private alertCtrl: AlertController,
              private popoverController: PopoverController) { }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }

  presentPopUp(title: any, message: any) {
    this.alertCtrl.create({
      cssClass: 'popUp',
      header: title,
      message: message,
      buttons: [{
        cssClass: 'popUpBtn',
        text: 'Ok',
        role: 'cancel'
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  /*
  presentPopover(ev: any) {
    this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return popover.present();
  }*/

}
