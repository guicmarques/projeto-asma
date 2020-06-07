import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

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

  exercicios: any = [
    {
      video: 'https://www.youtube.com/embed/T6Ftl5KfoYc',
      nome: 'Embrasa',
      repeticoes: 10,
      tempo: 15,
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mollis sem, vitae gravida magna auctor vitae. Curabitur feugiat et nibh a tincidunt. Curabitur id nulla tellus. Nam nec orci felis.'
    },
    {
      video: 'https://www.youtube.com/embed/I4hb1SqkQ_w',
      nome: 'Te Liguei',
      repeticoes: 8,
      tempo: 20,
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mollis sem, vitae gravida magna auctor vitae. Curabitur feugiat et nibh a tincidunt. Curabitur id nulla tellus. Nam nec orci felis.'
    },
    {
      video: 'https://www.youtube.com/embed/pZXcv8bcJaM',
      nome: 'Um pouco de você',
      repeticoes: 15,
      tempo: 10,
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mollis sem, vitae gravida magna auctor vitae. Curabitur feugiat et nibh a tincidunt. Curabitur id nulla tellus. Nam nec orci felis.'
    },
    {
      video: 'https://www.youtube.com/embed/qIOC6-jClWc',
      nome: 'Café',
      repeticoes: 20,
      tempo: 5,
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mollis sem, vitae gravida magna auctor vitae. Curabitur feugiat et nibh a tincidunt. Curabitur id nulla tellus. Nam nec orci felis.'
    },
    {
      video: 'https://www.youtube.com/embed/xT9DEweoXYo',
      nome: 'Calma',
      repeticoes: 15,
      tempo: 3,
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mollis sem, vitae gravida magna auctor vitae. Curabitur feugiat et nibh a tincidunt. Curabitur id nulla tellus. Nam nec orci felis.'
    },
    {
      video: 'https://www.youtube.com/embed/l5ulL5j3FYw',
      nome: 'Alô',
      repeticoes: 25,
      tempo: 5,
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mollis sem, vitae gravida magna auctor vitae. Curabitur feugiat et nibh a tincidunt. Curabitur id nulla tellus. Nam nec orci felis.'
    },
  ];

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getTrustUrl();
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
