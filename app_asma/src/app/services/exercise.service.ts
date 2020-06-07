import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private exercicios: any = [
    {
      id: 1,
      video: 'https://www.youtube.com/embed/T6Ftl5KfoYc',
      nome: 'Embrasa',
      repeticoes: 10,
      tempo: 15,
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mollis sem, vitae gravida magna auctor vitae. Curabitur feugiat et nibh a tincidunt. Curabitur id nulla tellus. Nam nec orci felis.'
    },
    {
      id: 2,
      video: 'https://www.youtube.com/embed/I4hb1SqkQ_w',
      nome: 'Te Liguei',
      repeticoes: 8,
      tempo: 20,
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mollis sem, vitae gravida magna auctor vitae. Curabitur feugiat et nibh a tincidunt. Curabitur id nulla tellus. Nam nec orci felis.'
    },
    {
      id: 3,
      video: 'https://www.youtube.com/embed/pZXcv8bcJaM',
      nome: 'Um pouco de você',
      repeticoes: 15,
      tempo: 10,
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mollis sem, vitae gravida magna auctor vitae. Curabitur feugiat et nibh a tincidunt. Curabitur id nulla tellus. Nam nec orci felis.'
    },
    {
      id: 4,
      video: 'https://www.youtube.com/embed/qIOC6-jClWc',
      nome: 'Café',
      repeticoes: 20,
      tempo: 5,
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mollis sem, vitae gravida magna auctor vitae. Curabitur feugiat et nibh a tincidunt. Curabitur id nulla tellus. Nam nec orci felis.'
    },
    {
      id: 5,
      video: 'https://www.youtube.com/embed/xT9DEweoXYo',
      nome: 'Calma',
      repeticoes: 15,
      tempo: 3,
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mollis sem, vitae gravida magna auctor vitae. Curabitur feugiat et nibh a tincidunt. Curabitur id nulla tellus. Nam nec orci felis.'
    },
    {
      id: 6,
      video: 'https://www.youtube.com/embed/l5ulL5j3FYw',
      nome: 'Alô',
      repeticoes: 25,
      tempo: 5,
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim mollis sem, vitae gravida magna auctor vitae. Curabitur feugiat et nibh a tincidunt. Curabitur id nulla tellus. Nam nec orci felis.'
    },
  ];

  constructor() { }

  getAllExercises() {
    return [...this.exercicios];
  }

  getExercise(exerciseId: number) {
    return {
      ...this.exercicios.find(exercicio => {
        return exercicio.id === exerciseId;
      })
    };
  }
}
