import { Router } from '@angular/router';
import { QuestionnaireService } from './../../../services/questionnaire.service';
import { Questionnaire } from './../../../models/questionnaire.mode';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.page.html',
  styleUrls: ['./questionario.page.scss'],
})
export class QuestionarioPage implements OnInit {
  slideOpts = {
    slidesPerView: 1.1,
    centeredSlides: true,
    spaceBetween: -100,
  };

  questions = [
    'Em média, durante os últimos sete dias, o quão frequentemente você se acordou por causa de sua asma, durante a noite?',
    'Em média, durante os últimos sete dias, o quão ruins foram os seus sintomas da asma, quando você acordou pela manhã?',
    'De um modo geral, durante os últimos sete dias, o quão limitado você tem estado em suas atividades por causa de sua asma?',
    'De um modo geral, durante os últimos sete dias, o quanto de falta de ar você teve por causa de sua asma?',
    'De um modo geral, durante os últimos sete dias, quanto tempo você teve chiado?',
    'Em média, durante os últimos sete dias, quantos jatos de broncodilatador de resgate (Sabutamol, Fenoterol, etc) você usou por dia?',
    'VEF1 pré broncodilatador ______ VEF1 previsto ______ VEF1 % previsto'
  ];

  choices = {
    1: ['Nunca', 'Quase nunca', 'Poucas vezes', 'Várias vezes', 'Muitas vezes',  'Muitíssimas vezes',  'Incapaz de dormir devido a asma'],
    2: ['Sem sintomas', 'Sintomas muito leves', 'Sintomas leves', 'Sintomas moderados', 'Sintomas um tanto graves', 'Sintomas graves', 'Sintomas muito graves'],
    3: ['Nada limitado', 'Muito pouco limitado', 'Pouco limitado', 'Moderadamente limitado', 'Muito limitado', 'Extremamente limitado', 'Totalmente limitado'],
    4: ['Nenhuma', 'Muito pouca', 'Alguma', 'Moderada', 'Bastante', 'Muita', 'Muitíssima'],
    5: ['Nunca', 'Quase nunca', 'Pouco tempo', 'Algum tempo', 'Bastante tempo', 'Quase sempre', 'Sempre'],
    6: ['Nenhum', '1-2 jatos na maior parte dos dias', '3-4 jatos na maior parte dos dias', '5-8 jatos na maior parte dos dias', '9-12 jatos na maior parte dos dias', '13-16 jatos na maior parte dos dias', 'Mais de 16 jatos por dia'],
    7: ['> 95% do previsto', '95-90% do previsto', '89-80% do previsto', '79-70% do previsto', '69-60% do previsto', '59-50% do previsto', '< 50% do previsto']
  };
  
  answers: Questionnaire = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null
  };

  @ViewChild('slides', {static: false}) slides: IonSlides

  constructor(private questionnaireService: QuestionnaireService,
              private router: Router) {}

  ngOnInit() {}

  ionViewDidLeave(){
    this.slides.slideTo(0);
    for(let i = 1; i <= 7; i++) {
      this.answers[i] = null
    }
  }

  prevSlide() {
    this.slides.slidePrev();
  }

  nextSlide() {
    this.slides.slideNext();
  }
  
  sendAnswers() {
    console.log('Respostas:', this.answers);
    this.questionnaireService.setAnswers(this.answers).then(data => {
      console.log(data);
      this.router.navigateByUrl('tabs/diario');
    })
  }

}
