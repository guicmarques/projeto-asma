import { DateService } from './../../services/date.service';
import { CalendarioComponent } from './calendario/calendario.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.page.html',
  styleUrls: ['./diario.page.scss'],
})
export class DiarioPage implements OnInit {
  dayName: string;
  day: string;
  month: string;
  week: string[] = ['10','11','12','13','14','15','16'];

  constructor(private modalController: ModalController,
              private dateService: DateService) { }

  ngOnInit() {
    [this.dayName, this.day, this.month] = this.dateService.getDate()
    //this.week = this.dateService.getWeek();
    //console.log(this.week)
  }

  

  openCalend() {
    this.presentModal();
  }

  presentModal() {
    const modal =  this.modalController.create({
      component: CalendarioComponent
    }).then(modal => {
      modal.present();
    });
  }

}
