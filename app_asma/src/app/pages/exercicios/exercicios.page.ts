import { AlertService } from './../../services/alert.service';
import { Exercise } from './../../models/exercise.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicios.page.html',
  styleUrls: ['./exercicios.page.scss'],
})

export class ExerciciosPage implements OnInit {
  trustedVideoUrl: SafeResourceUrl;

  slideOpts = {
    centeredSlides: true,
    slidesPerView: 1.3,
    spaceBetween: 2
  };

  filterMode: string = 'slides';

  gridExercises: any[] = [];

  /*exercicios: any = [
    {
      id: null,
      video: '',
      nome: '',
      repeticoes: null,
      tempo: null,
      descricao: ''
    }
  ];*/

  exercicios: any = [
    {
      id: null,
      video: '',
      nome: '',
      repeticoes: null,
      tempo: null,
      descricao: ''
    }
  ];

  constructor(private domSanitizer: DomSanitizer, private exerciseService: ExerciseService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.presentLoading(4000);

    this.exerciseService.getAllExercises().then(data => {
      let result = JSON.stringify(data);
      result = JSON.parse(result);
      this.exercicios = Object.values(result);
      this.getTrustUrl();
    });
    //this.exercicios = this.exerciseService.getAllExercises();
    //this.getTrustUrl();
  }

  getTrustUrl() {
    for (let exercicio of this.exercicios) {
      exercicio.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(exercicio.video);
    }
  }

  selectFilter(type: string) {
    if (type === 'grid' && this.filterMode === 'slides') {
      this.filterMode = 'grid';
      this.sortOnGrid();
    } else if (type === 'slides' && this.filterMode === 'grid'){
      this.filterMode = 'slides';
    }
  }

  sortOnGrid() {
    this.gridExercises = [];
    for (let i = 0; i < this.exercicios.length; i += 2) {
      if (i + 1 < this.exercicios.length){
        this.gridExercises.push([this.exercicios[i], this.exercicios[i+1]]);
      } else {
        this.gridExercises.push([this.exercicios[i]]);
      }
    }
    console.log(this.gridExercises);
  }
}
