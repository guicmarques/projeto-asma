import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  loading: any;

  constructor(private toastController: ToastController, 
              private alertCtrl: AlertController,
              private loadingController: LoadingController) { }

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

  presentNoButtonPopUp(title: any, message: any) {
    this.alertCtrl.create({
      cssClass: 'noButtonPopUp',
      header: title,
      message: message
    }).then(alertEl => {
      alertEl.present();
    });
  }

  presentLoading(time: number) {
    this.loadingController.create({
      cssClass: 'loading-class',
      message: 'Carregando...',
      duration: time,
      spinner: 'circles'
    }).then(data => {
      this.loading = data;
      data.present();
      return data;
    });
  }
}
