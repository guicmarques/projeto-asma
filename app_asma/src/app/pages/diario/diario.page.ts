import { DiaryService } from './../../services/diary.service';
import { Diary } from './../../models/diary.model';
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
  daysName: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  dayName: string;
  day: string;
  month: string;
  week: string[];
  diaryPage: Diary = {
    note: '',
    pico: [null, null, null],
    tosse: '',
    chiado: '',
    faltaAr: '',
    acordar: '',
    bombinha: ''
  }


  constructor(private modalController: ModalController,
              private dateService: DateService,
              private diaryService: DiaryService) { }

  ngOnInit() {
    [this.dayName, this.day, this.month] = this.dateService.getDate()
    this.week = this.dateService.getWeek();
    this.diaryService.getDiary().then(data => {
      console.log('Diário:', data);
    });
    //console.log(this.week)
  }

  getDiaryPage(date: string) {
    console.log('Clicado')
    this.diaryService.getDiary().then(data => {
      console.log('Diário:', data);
      
    });
  }

  setDiaryPage() {
    console.log(this.diaryPage);
    this.diaryService.setDiaryPage(this.diaryPage).then(data => {
      console.log(data)
    });
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
