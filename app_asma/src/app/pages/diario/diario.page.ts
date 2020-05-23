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
  year: string;
  week: string[];
  pageView: string[];
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
    [this.dayName, this.day, this.month, this.year] = this.dateService.getDate()
    this.week = this.dateService.getWeek();
    this.getDiaryPage([this.day, this.month, this.year, 'today'])

    //console.log(this.week)
  }

  getDiaryPage(date: string[]) {
    console.log('Clicado')
    this.pageView = date;

    this.diaryService.getDiary().then(data => {
      console.log('Diário:', data);
      let fullDate = date[2] + '-' + date[1] + '-' + date[0];
      if (data[fullDate] === undefined) {
        this.diaryPage = {
          note: '',
          pico: [null, null, null],
          tosse: '',
          chiado: '',
          faltaAr: '',
          acordar: '',
          bombinha: ''
        };
      } else {
        this.diaryPage = {
          note: data[fullDate].notes,
          pico: data[fullDate].picoDeFluxo.substring(2, data[fullDate].picoDeFluxo.length - 2).split("', '").map(x => +x),
          tosse: data[fullDate].tosse.toString(),
          chiado: data[fullDate].chiado.toString(),
          faltaAr: data[fullDate].faltaDeAr.toString(),
          acordar: data[fullDate].acordar.toString(),
          bombinha: data[fullDate].bombinha.toString()
        };
      }
      
      console.log('Page:', this.diaryPage);
      console.log(this.diaryPage.pico)
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
