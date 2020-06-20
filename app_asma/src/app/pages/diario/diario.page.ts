import { EventService } from './../../services/event.service';
import { Subscription } from 'rxjs';
import { BarrierService } from './../../services/barrier.service';
import { QuestionnaireService } from './../../services/questionnaire.service';
import { AnimationsService } from './../../services/animations.service';
import { AlertService } from './../../services/alert.service';
import { DiaryService } from './../../services/diary.service';
import { Diary } from './../../models/diary.model';
import { DateService } from './../../services/date.service';
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

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
  week: string[][];
  pageView: string[];
  diaryPage: Diary = {
    note: '',
    pico: [null, 0, 0],
    tosse: '',
    chiado: '',
    faltaAr: '',
    acordar: '',
    bombinha: ''
  }
  peakEnable: boolean = false;
  peakVal: number = 375;

  description = {
    note: 'É importante detalhar o máximo possível os seus sintomas para que seu médico possa lhe dar um tratamento mais personalizado.',
    pico: 'Serve para medir a facilidade do ar passar nos brônquios (vias aéreas). É importante seguir as orientações dos profissionais da saúde e anotar o valor do pico de fluxo (ou peakflow) diariamente. Essas informações ajudarão o médico a escolher o melhor tratamento da sua asma.',
    tosse: 'A tosse é uma reação involuntária e um dos principais sintomas da asma. Acontece mais frequentemente no período da noite ou de manhã cedo.',
    chiado: 'O chiado no peito também pode ser chamado de “gatinhos no peito” ou “sibilância”, é um sintoma que acontece frequentemente quando os sintomas da asma pioram. O ruído (barulho) é agudo e acontece, principalmente, quando o ar entra nos pulmões. Isto acontece porque o tamanho dos brônquios (vias aéreas) diminui (broncoconstrição).',
    faltaAr: 'A falta de ar é a dificuldade de respirar. Algumas pessoas sentem como uma sensação de peso no peito, esforço para respirar e até mesmo quando não consegue respirar fundo. Acontece porque os brônquios (ou vias aéreas) se fecham e dificultam a passagem de ar. Muitas vezes vem junto com o chiado. Costuma aliviar quando usa a “bombinha” (broncodilatador).',
    acordar: 'Os sintomas da asma podem mudar a qualidade do seu sono. Uma noite mal dormida pode afetar as atividades do seu dia-a-dia e piorar os sintomas de asma. Por isso, é importante seguir o tratamento, buscando controlar os sintomas e melhorar as noites de sono.',
    bombinha: 'A “bombinha” (ou broncodilatador) é usado para aliviar os sintomas da asma. Para o medicamento fazer efeito, é importante seguir as orientações dos profissionais de saúde e usá-lo corretamente. O efeito da “bombinha” (ou broncodilatador) é relaxar os músculos dos brônquios (vias aéreas) e facilitar a passagem de ar e aliviar os sintomas.'
  }

  showACQ: boolean = false;
  showBarriers: boolean = false;

  @ViewChild('saveIcon', {static: false}) saveIcon: ElementRef;
  @ViewChild('loadingBack', {static: false}) loadingBack: ElementRef;
  @ViewChild('checkIcon', {static: false}) checkIcon: ElementRef;
  @ViewChild('ACQContainer', {static: false}) ACQContainer: ElementRef;
  @ViewChild('barriersContainer', {static: false}) barriersContainer: ElementRef;


  constructor(private dateService: DateService,
              private diaryService: DiaryService,
              private alertService: AlertService,
              private questionnaireService: QuestionnaireService,
              private barriersService: BarrierService,
              private eventService: EventService,
              private animationService: AnimationsService) {

    this.eventService.subscribe('ACQAnswered', bool => {
      this.showACQ = bool;
    })

    this.eventService.subscribe('barriersAnswered', bool => {
      this.showBarriers = bool;
    });
  }

  ngOnInit() {
    [this.dayName, this.day, this.month, this.year] = this.dateService.getDate()
    this.week = this.dateService.getWeek();
    this.getDiaryPage([this.day, this.dateService.getMonthNumber(this.month), this.year, 'selected']);

    this.displayACQ();
    this.displayBarriers();

    setTimeout(() => { this.sendReminder(); }, 2000);

    //console.log('Teste: ' + this.dateService.getLastDays(3));
    //console.log(this.week)
  }

  ionViewDidEnter(){
    this.getDiaryPage([this.day, this.dateService.getMonthNumber(this.month), this.year, 'selected']);
    this.sendReminder();
  }

  getDiaryPage(date: string[]) {
    console.log('Clicado')
    this.alertService.presentLoading(3000);
    this.pageView = date;

    this.diaryService.getDiary().then(data => {
      console.log('Diário:', data);
      let fullDate = date[2] + '-' + date[1] + '-' + date[0].padStart(2, '0');
      if (data[fullDate] === undefined) {
        this.diaryPage = {
          note: '',
          pico: [null, 0, 0],
          tosse: '',
          chiado: '',
          faltaAr: '',
          acordar: '',
          bombinha: ''
        };

        if (date[0] === this.day) {
          this.peakVal = 375;
        } else {
          this.peakVal = null;
        }
        this.peakEnable = false;

      } else {

        if (data[fullDate].pico[0] === "-1") {
          data[fullDate].pico[0] = null;
        } else {
          data[fullDate].pico[0] = +data[fullDate].pico[0];
        }
        data[fullDate].pico[1] = 0;
        data[fullDate].pico[2] = 0;

        this.diaryPage = {
          note: data[fullDate].notes,
          pico: data[fullDate].pico,
          tosse: data[fullDate].tosse.toString(),
          chiado: data[fullDate].chiado.toString(),
          faltaAr: data[fullDate].faltaDeAr.toString(),
          acordar: data[fullDate].acordar.toString(),
          bombinha: data[fullDate].bombinha.toString()
        };

        if (data[fullDate].pico[0] == null) {
          this.peakVal = 375;
          this.peakEnable = false;
        } else {
          this.peakVal = data[fullDate].pico[0];
          this.peakEnable = true;
        }
      }

      this.week.forEach(element => { 
        if (element[3] === 'selected' && element[0].padStart(2, '0') !== date[0].padStart(2, '0')) {
          element[3] = 'before';
        } else if (element[0].padStart(2, '0') === date[0].padStart(2, '0')) {
          element[3] = 'selected';
        }
      });

      console.log('Week: ', this.week);
      console.log('Page:', this.diaryPage);
      console.log(this.diaryPage.pico)
    });
  }

  setDiaryPage() {
    console.log(this.diaryPage);

    if ((+this.peakEnable && this.peakVal) == 0) {
      this.diaryPage.pico[0] = -1;
    } else {
      this.diaryPage.pico[0] = this.peakVal;
    }

    console.log("Pico:", this.diaryPage.pico);

    this.diaryService.setDiaryPage(this.diaryPage).then(data => {
      console.log(data)
      this.animationService.clickAnimation(this.saveIcon, this.loadingBack, this.checkIcon);
    });
  }

  presentPopUp(cardTitle:string, cardSelected: string) {
    this.alertService.presentNoButtonPopUp(cardTitle, this.description[cardSelected]);
  }

  displayACQ() {
    this.questionnaireService.getLastQuestionnaireDate().then(date => {
      if (date === undefined) {
        this.showACQ = true;
        return;
      }

      let today = this.year + '-' + this.dateService.getMonthNumber(this.month) + '-' + this.day;
      console.log('Hoje:', today);
      let diffDays = this.dateService.compareDates(today, date)

      if (diffDays >= 2) {
        this.showACQ = true;
        return;
      }

      this.showACQ = false;
      return;
    });
  }

  displayBarriers() {
    this.barriersService.getLastBarriersDate().then(date => {  
      if (date === undefined) {
        this.showBarriers = true;
        return;
      }

      let today = this.year + '-' + this.dateService.getMonthNumber(this.month) + '-' + this.day;
      console.log('Hoje:', today);
      let diffDays = this.dateService.compareDates(today, date)

      if (diffDays >= 2) {
        this.showBarriers = true;
        return;
      }

      this.showBarriers = false;
      return;
    });

  }

  sendReminder() {
    console.log('lembrete', this.showACQ, this.showBarriers)
    if(this.showACQ || this.showBarriers) {
      this.alertService.presentPopUp('', `<img src="../../../assets/images/bell_notification.gif">
      <h2>Atenção!</h2>
      <div>Você possui questionários pendentes!</div>`);
    }
  }

}
