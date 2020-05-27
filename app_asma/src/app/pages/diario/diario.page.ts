import { AlertService } from './../../services/alert.service';
import { DiaryService } from './../../services/diary.service';
import { Diary } from './../../models/diary.model';
import { DateService } from './../../services/date.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

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
    pico: [null, null, null],
    tosse: '',
    chiado: '',
    faltaAr: '',
    acordar: '',
    bombinha: ''
  }
  description = {
    note: 'É importante detalhar o máximo possível os seus sintomas para que seu médico possa lhe dar um tratamento mais personalizado.',
    pico: 'Medir o pico de fluxo expiratório é importante para acompanhar a sua saúde respiratória, deve-se anotar o valor indicado no medidor seguindo as orientações da equipe de saúde. Essas informações ajudam os profissionais de saúde a acompanhar sua saúde e, assim, escolher o melhor tratamento da asma para você.',
    tosse: 'Tosse é uma forma de expulsar o ar para fora dos pulmões. Ocorre normalmente de forma involuntária e não deve ser contida. É um dos principais sintomas da asma e pode ser mais frequente no período da noite ou de manhã cedo.',
    chiado: 'O Chiado (também chamado de Sibilância) corresponde ao som agudo ao respirar, ocorre devido a diminuição do tamanho tubos por onde passa o ar nos pulmões (chamados de vias aéreas). É um sintoma frequente em pessoas com asma, e a frequência que você sente o chiado deve ser comunicado aos profissionais de saúde.',
    faltaAr: 'A falta de ar é marcada pela dificuldade de respirar. Pode ser sentida como sensação de peso no peito, muito esforço para respirar e/ou quando não consegue respirar fundo. Devido a asma, os tubos que transportam o ar nos pulmões (chamados de vias aéreas) se estreitam mais do que o normal, dificultando a passagem de ar, resultando na sensação de falta de ar. É um sintoma importante e quando intenso, deve-se aliviar os sintomas usando a “bombinha”. Caso não esteja com ela, ou você não se sentir melhor após usá-la, procurar ajuda médica no pronto socorro imediatamente.',
    acordar: 'Os sintomas da asma podem influenciar a qualidade do seu sono. Uma noite mal dormida pode afetar as atividades do seu dia a dia e dificultar, também, a melhora da asma. Por isso, é importante seguir o programa de tratamento, buscando controlar os sintomas e, assim, melhorar suas noites de sono.',
    bombinha: 'A “bombinha” contém um remédio (broncodilatadores) muito usado para aliviar os sintomas da asma. Para o medicamento fazer efeito, é importante usá-lo corretamente, de acordo com as orientações dos profissionais de saúde. Os broncodilatadores são inalados e vão para dentro dos pulmões, lá atuam relaxando os músculos responsáveis pelo estreitamento dos tubos (vias aéreas) do pulmão, melhorando a passagem de ar e aliviando os sintomas imediatamente.'
  }
  @ViewChild('saveIcon', {static: false}) saveIcon: ElementRef;
  @ViewChild('loadingBack', {static: false}) loadingBack: ElementRef;
  @ViewChild('checkIcon', {static: false}) checkIcon: ElementRef;

  icon: Animation;
  background: Animation;
  check: Animation;

  constructor(private modalController: ModalController,
              private dateService: DateService,
              private diaryService: DiaryService,
              private alertService: AlertService,
              private animationCtrl: AnimationController) { }

  ngOnInit() {
    [this.dayName, this.day, this.month, this.year] = this.dateService.getDate()
    this.week = this.dateService.getWeek();
    this.getDiaryPage([this.day, this.dateService.getMonthNumber(this.month), this.year, 'selected'])

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
          pico: data[fullDate].pico.map(x => +x),
          tosse: data[fullDate].tosse.toString(),
          chiado: data[fullDate].chiado.toString(),
          faltaAr: data[fullDate].faltaDeAr.toString(),
          acordar: data[fullDate].acordar.toString(),
          bombinha: data[fullDate].bombinha.toString()
        };
      }

      this.week.forEach(element => { 
        if (element[3] === 'selected' && element[0] !== date[0]) {
          element[3] = 'before';
        } else if (element[0] === date[0]) {
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
    this.diaryService.setDiaryPage(this.diaryPage).then(data => {
      console.log(data)
      this.clickAnimation();
    });
  }

  presentPopUp(cardTitle:string, cardSelected: string) {
    this.alertService.presentNoButtonPopUp(cardTitle, this.description[cardSelected]);
  }

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
